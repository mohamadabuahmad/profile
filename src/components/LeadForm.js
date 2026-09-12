import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { trackEvent } from '../analytics';
import { LOCALES, SITE, pathFor } from '../i18n/locales';
import { fill, plural } from '../i18n/format';
import { useSite } from '../app/SiteContext';

export const NEED_IDS = ['ai', 'automation', 'web', 'webapp', 'mobile', 'unsure'];
export const BUDGET_IDS = ['unsure', 'lt2k', '2k-5k', '5k-15k', '15k+'];
const EMPTY = { name: '', company: '', email: '', phone: '', needs: [], budget: '', message: '', website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const FIELD_ORDER = ['name', 'email', 'phone', 'needs', 'message'];

// Returns error keys; the visible messages come from the active locale.
export const validate = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = true;
  if (!EMAIL_RE.test(v.email.trim())) errors.email = true;
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) errors.phone = true;
  if (v.needs.length === 0) errors.needs = true;
  if (v.message.trim().length < 15) errors.message = true;
  return errors;
};

// The lead email is for Mohamad, so it is always written in English, whatever language
// the visitor used — with that language noted.
const EMAIL_LABELS = {
  needs: {
    ai: 'AI Solution',
    automation: 'Automation / Integration',
    web: 'Website / E-Commerce',
    webapp: 'Web Application',
    mobile: 'Mobile Application',
    unsure: 'Not Sure Yet',
  },
  budgets: {
    unsure: 'Not sure yet',
    lt2k: 'Under $2,000',
    '2k-5k': '$2,000 – $5,000',
    '5k-15k': '$5,000 – $15,000',
    '15k+': '$15,000+',
  },
};

const needLabels = (ids) => NEED_IDS.filter((id) => ids.includes(id)).map((id) => EMAIL_LABELS.needs[id]).join(', ');

export const buildEmail = (v, locale = 'en', sourcePath = pathFor('contact', locale)) => ({
  name: v.name.trim(),
  email: v.email.trim(),
  reply_to: v.email.trim(),
  phone: v.phone.trim(),
  company: v.company.trim(),
  service: needLabels(v.needs),
  budget: v.budget ? EMAIL_LABELS.budgets[v.budget] : '',
  language: LOCALES[locale].name,
  message: [
    `New project inquiry — mohamaddev.com${sourcePath}`,
    '',
    `Needs: ${needLabels(v.needs)}`,
    `Company: ${v.company.trim() || '—'}`,
    `Phone: ${v.phone.trim() || '—'}`,
    `Budget: ${v.budget ? EMAIL_LABELS.budgets[v.budget] : '—'}`,
    `Language: ${LOCALES[locale].name}`,
    '',
    'The problem:',
    v.message.trim(),
  ].join('\n'),
});

// Lead form. `preset` ({ need, note, nonce }) comes from CTAs elsewhere on the page and
// pre-selects what the visitor clicked, so they never have to repeat it.
const LeadForm = ({ preset, headingId = 'lead-form-title', source = 'contact' }) => {
  const { t, locale } = useSite();
  const f = t.form;
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [summary, setSummary] = useState('');
  const started = useRef(false);
  const fields = useRef({});
  const resultRef = useRef(null);

  useEffect(() => {
    if (!preset) return;
    setValues((v) => ({
      ...v,
      needs: preset.need && !v.needs.includes(preset.need) ? [...v.needs, preset.need] : v.needs,
      message: preset.note && !v.message.trim() ? `${preset.note} ` : v.message,
    }));
  }, [preset]);

  useEffect(() => {
    if (status === 'success' || status === 'error') resultRef.current?.focus();
  }, [status]);

  const errors = validate(values);
  const show = (name) => touched[name] && errors[name];
  const error = (name) => show(name) && <p id={`${name}-error`} className="ds-field__error">{f.errors[name]}</p>;
  const describedBy = (name, hint) => [hint, show(name) ? `${name}-error` : null].filter(Boolean).join(' ') || undefined;

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));
  const blur = (name) => () => setTouched((tch) => ({ ...tch, [name]: true }));
  const toggleNeed = (id) => {
    setValues((v) => ({ ...v, needs: v.needs.includes(id) ? v.needs.filter((n) => n !== id) : [...v.needs, id] }));
    setTouched((tch) => ({ ...tch, needs: true }));
  };

  const onFocusCapture = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('Lead', 'lead_form_start', `${locale}:${preset?.source || 'direct'}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = Object.keys(errors);
    if (found.length) {
      setTouched({ name: true, email: true, phone: true, needs: true, message: true });
      setSummary(plural(f.summary, found.length, locale));
      fields.current[FIELD_ORDER.find((k) => errors[k])]?.focus();
      return;
    }
    setSummary('');
    if (values.website) {
      // Honeypot filled in: almost certainly a bot. Pretend it worked, send nothing.
      setStatus('success');
      return;
    }
    setStatus('sending');
    trackEvent('Lead', 'lead_form_submit', `${locale}:${needLabels(values.needs)}`);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        buildEmail(values, locale, pathFor(source, locale)),
        process.env.REACT_APP_EMAILJS_USER_ID
      );
      trackEvent('Lead', 'lead_form_success', `${locale}:${needLabels(values.needs)}`);
      setStatus('success');
    } catch (err) {
      trackEvent('Lead', 'lead_form_error', `${locale}:${err?.status || 'unknown'}`);
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setStatus('idle');
  };

  if (status === 'success') {
    const first = values.name.trim().split(/\s+/)[0];
    const email = values.email.trim();
    return (
      <div className="ds-form ds-form--done" role="status">
        <FiCheckCircle className="ds-form__done-icon" aria-hidden="true" />
        <h3 className="ds-form__title" tabIndex={-1} ref={resultRef}>
          {first ? fill(f.successTitleNamed, { first: <bdi>{first}</bdi> }) : f.successTitle}
        </h3>
        <p>
          {fill(f.successBody, {
            to: email ? fill(f.successTo, { email: <bdi dir="ltr">{email}</bdi> }) : '',
          })}
        </p>
        <button type="button" className="ds-link" onClick={reset}>
          {f.another}
        </button>
      </div>
    );
  }

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(f.mailSubject)}&body=${encodeURIComponent(values.message)}`;
  const optional = <span className="ds-field__opt">{f.optional}</span>;

  return (
    <form className="ds-form" aria-labelledby={headingId} onSubmit={onSubmit} onFocusCapture={onFocusCapture} noValidate>
      <div className="ds-form__grid">
        <div className="ds-field">
          <label htmlFor="lf-name">{f.name}</label>
          <input
            id="lf-name"
            ref={(el) => (fields.current.name = el)}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            aria-invalid={!!show('name')}
            aria-describedby={describedBy('name')}
            required
          />
          {error('name')}
        </div>

        <div className="ds-field">
          <label htmlFor="lf-company">{f.company} {optional}</label>
          <input id="lf-company" name="company" autoComplete="organization" value={values.company} onChange={set('company')} />
        </div>

        <div className="ds-field">
          <label htmlFor="lf-email">{f.email}</label>
          <input
            id="lf-email"
            ref={(el) => (fields.current.email = el)}
            type="email"
            name="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            aria-invalid={!!show('email')}
            aria-describedby={describedBy('email')}
            required
          />
          {error('email')}
        </div>

        <div className="ds-field">
          <label htmlFor="lf-phone">{f.phone} {optional}</label>
          <input
            id="lf-phone"
            ref={(el) => (fields.current.phone = el)}
            type="tel"
            name="phone"
            dir="ltr"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            onBlur={blur('phone')}
            aria-invalid={!!show('phone')}
            aria-describedby={describedBy('phone')}
          />
          {error('phone')}
        </div>
      </div>

      <fieldset className="ds-field ds-needs" aria-describedby={show('needs') ? 'needs-error' : undefined}>
        <legend>{f.needsLegend}</legend>
        <div className="ds-needs__options">
          {NEED_IDS.map((id, i) => (
            <label key={id} className="ds-need">
              <input
                type="checkbox"
                name="needs"
                value={id}
                ref={i === 0 ? (el) => (fields.current.needs = el) : undefined}
                checked={values.needs.includes(id)}
                onChange={() => toggleNeed(id)}
              />
              <span>{f.needs[id]}</span>
            </label>
          ))}
        </div>
        {error('needs')}
      </fieldset>

      <div className="ds-field">
        <label htmlFor="lf-budget">{f.budgetLabel} {optional}</label>
        <select id="lf-budget" name="budget" value={values.budget} onChange={set('budget')}>
          <option value="">{f.budgetNone}</option>
          {BUDGET_IDS.map((id) => (
            <option key={id} value={id}>{f.budgets[id]}</option>
          ))}
        </select>
      </div>

      <div className="ds-field">
        <label htmlFor="lf-message">{f.messageLabel}</label>
        <p id="message-hint" className="ds-field__hint">{f.messageHint}</p>
        <textarea
          id="lf-message"
          ref={(el) => (fields.current.message = el)}
          name="message"
          rows={5}
          value={values.message}
          onChange={set('message')}
          onBlur={blur('message')}
          aria-invalid={!!show('message')}
          aria-describedby={describedBy('message', 'message-hint')}
          required
        />
        {error('message')}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it in. */}
      <div className="ds-hp" aria-hidden="true">
        <label htmlFor="lf-website">Website</label>
        <input id="lf-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <p className="ds-form__summary" role="alert">{summary}</p>

      {status === 'error' && (
        <div className="ds-form__error" tabIndex={-1} ref={resultRef}>
          <FiAlertCircle aria-hidden="true" />
          <p>{fill(f.failure, { link: <a href={mailto}>{f.failureLink}</a> })}</p>
        </div>
      )}

      <button type="submit" className="ds-btn ds-btn--primary ds-btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <FiLoader className="ds-spin" aria-hidden="true" /> {f.sending}
          </>
        ) : (
          <>
            {f.submit} <FiArrowRight className="ds-arrow" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="ds-form__fine">{f.fine}</p>
    </form>
  );
};

export default LeadForm;
