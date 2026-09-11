import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { trackEvent } from '../../../analytics';
import { NEEDS, BUDGETS, closing } from '../content';

const EMPTY = { name: '', company: '', email: '', phone: '', needs: [], budget: '', message: '', website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const FIELD_ORDER = ['name', 'email', 'phone', 'needs', 'message'];

export const validate = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email so I can reply.';
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) errors.phone = 'That phone number looks incomplete.';
  if (v.needs.length === 0) errors.needs = "Choose at least one — 'Not Sure Yet' is fine.";
  if (v.message.trim().length < 15) errors.message = 'A sentence or two about the problem is enough.';
  return errors;
};

const labelsFor = (ids) => NEEDS.filter((n) => ids.includes(n.id)).map((n) => n.label).join(', ');

export const buildEmail = (v) => ({
  name: v.name.trim(),
  email: v.email.trim(),
  reply_to: v.email.trim(),
  phone: v.phone.trim(),
  company: v.company.trim(),
  service: labelsFor(v.needs),
  budget: v.budget,
  message: [
    'New project inquiry — mohamaddev.com/services',
    '',
    `Needs: ${labelsFor(v.needs)}`,
    `Company: ${v.company.trim() || '—'}`,
    `Phone: ${v.phone.trim() || '—'}`,
    `Budget: ${v.budget || '—'}`,
    '',
    'The problem:',
    v.message.trim(),
  ].join('\n'),
});

// Lead form. `preset` ({ need, note, nonce }) comes from CTAs elsewhere on the page and
// pre-selects what the visitor clicked, so they never have to repeat it.
const LeadForm = ({ preset }) => {
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

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));
  const blur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));
  const toggleNeed = (id) => {
    setValues((v) => ({ ...v, needs: v.needs.includes(id) ? v.needs.filter((n) => n !== id) : [...v.needs, id] }));
    setTouched((t) => ({ ...t, needs: true }));
  };

  const onFocusCapture = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('Services', 'lead_form_start', preset?.source || 'direct');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = Object.keys(errors);
    if (found.length) {
      setTouched({ name: true, email: true, phone: true, needs: true, message: true });
      setSummary(`Please check ${found.length === 1 ? '1 field' : `${found.length} fields`} before sending.`);
      const first = FIELD_ORDER.find((f) => errors[f]);
      fields.current[first]?.focus();
      return;
    }
    setSummary('');
    if (values.website) {
      // Honeypot filled in: almost certainly a bot. Pretend it worked, send nothing.
      setStatus('success');
      return;
    }
    setStatus('sending');
    trackEvent('Services', 'lead_form_submit', labelsFor(values.needs));
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        buildEmail(values),
        process.env.REACT_APP_EMAILJS_USER_ID
      );
      trackEvent('Services', 'lead_form_success', labelsFor(values.needs));
      setStatus('success');
    } catch (err) {
      trackEvent('Services', 'lead_form_error', String(err?.status || 'unknown'));
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="svc-form svc-form--done" role="status">
        <FiCheckCircle className="svc-form__done-icon" aria-hidden="true" />
        <h3 className="svc-form__title" tabIndex={-1} ref={resultRef}>
          Thanks{values.name ? `, ${values.name.trim().split(' ')[0]}` : ''} — your message is in.
        </h3>
        <p>
          I'll read it personally and reply by email{values.email ? ` to ${values.email.trim()}` : ''}. If it's
          a fit, the next step is a short call about the problem.
        </p>
        <button type="button" className="svc-link" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  const mailto = `mailto:${closing.email}?subject=${encodeURIComponent('Project inquiry')}&body=${encodeURIComponent(
    values.message
  )}`;
  const describedBy = (name, hint) => [hint, show(name) ? `${name}-error` : null].filter(Boolean).join(' ') || undefined;

  return (
    <form className="svc-form" onSubmit={onSubmit} onFocusCapture={onFocusCapture} noValidate>
      <div className="svc-form__grid">
        <div className="svc-field">
          <label htmlFor="lf-name">Name</label>
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
          {show('name') && <p id="name-error" className="svc-field__error">{errors.name}</p>}
        </div>

        <div className="svc-field">
          <label htmlFor="lf-company">
            Business / company <span className="svc-field__opt">optional</span>
          </label>
          <input id="lf-company" name="company" autoComplete="organization" value={values.company} onChange={set('company')} />
        </div>

        <div className="svc-field">
          <label htmlFor="lf-email">Email</label>
          <input
            id="lf-email"
            ref={(el) => (fields.current.email = el)}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            aria-invalid={!!show('email')}
            aria-describedby={describedBy('email')}
            required
          />
          {show('email') && <p id="email-error" className="svc-field__error">{errors.email}</p>}
        </div>

        <div className="svc-field">
          <label htmlFor="lf-phone">
            Phone <span className="svc-field__opt">optional</span>
          </label>
          <input
            id="lf-phone"
            ref={(el) => (fields.current.phone = el)}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            onBlur={blur('phone')}
            aria-invalid={!!show('phone')}
            aria-describedby={describedBy('phone')}
          />
          {show('phone') && <p id="phone-error" className="svc-field__error">{errors.phone}</p>}
        </div>
      </div>

      <fieldset className="svc-field svc-needs" aria-describedby={show('needs') ? 'needs-error' : undefined}>
        <legend>What do you need help with?</legend>
        <div className="svc-needs__options">
          {NEEDS.map((n, i) => (
            <label key={n.id} className="svc-need">
              <input
                type="checkbox"
                name="needs"
                value={n.id}
                ref={i === 0 ? (el) => (fields.current.needs = el) : undefined}
                checked={values.needs.includes(n.id)}
                onChange={() => toggleNeed(n.id)}
              />
              <span>{n.label}</span>
            </label>
          ))}
        </div>
        {show('needs') && <p id="needs-error" className="svc-field__error">{errors.needs}</p>}
      </fieldset>

      <div className="svc-field">
        <label htmlFor="lf-budget">
          Budget range <span className="svc-field__opt">optional</span>
        </label>
        <select id="lf-budget" name="budget" value={values.budget} onChange={set('budget')}>
          <option value="">Prefer not to say</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="svc-field">
        <label htmlFor="lf-message">Tell me about the problem you want to solve</label>
        <p id="message-hint" className="svc-field__hint">
          What happens today, what's frustrating about it, and what "better" would look like.
        </p>
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
        {show('message') && <p id="message-error" className="svc-field__error">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it in. */}
      <div className="svc-hp" aria-hidden="true">
        <label htmlFor="lf-website">Website</label>
        <input id="lf-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <p className="svc-form__summary" role="alert">{summary}</p>

      {status === 'error' && (
        <div className="svc-form__error" tabIndex={-1} ref={resultRef}>
          <FiAlertCircle aria-hidden="true" />
          <p>
            Your message couldn't be sent. Nothing you typed was lost — please try again, or{' '}
            <a href={mailto}>email me directly</a>.
          </p>
        </div>
      )}

      <button type="submit" className="svc-btn svc-btn--primary svc-btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <FiLoader className="svc-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Discuss My Project <FiArrowRight aria-hidden="true" />
          </>
        )}
      </button>
      <p className="svc-form__fine">Your details are only used to reply to your message.</p>
    </form>
  );
};

export default LeadForm;
