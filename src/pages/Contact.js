import React from 'react';
import { FiMail, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';
import { SITE } from '../i18n/locales';
import { useSite } from '../app/SiteContext';
import { trackEvent } from '../analytics';
import LeadForm from '../components/LeadForm';
import './contact.css';

/**
 * The page reads head → what happens next → form → direct → FAQ in the DOM, and the
 * grid keeps that order on every breakpoint. Nothing is visually reordered, so the
 * form never climbs above the H1 on a phone and tab order always matches the page.
 */
const Contact = () => {
  const { t } = useSite();
  const c = t.contact;

  return (
    <section className="ds-section ds-contact" aria-labelledby="contact-title">
      <div className="ds-wrap ds-contact__grid">
        <header className="ds-contact__head">
          <p className="ds-eyebrow ds-rise">{c.hero.eyebrow}</p>
          <h1 id="contact-title" className="ds-display ds-contact__title ds-rise" style={{ '--d': 1 }}>
            {c.hero.title}
          </h1>
          <p className="ds-lede ds-contact__lede ds-rise" style={{ '--d': 2 }}>{c.hero.lede}</p>
        </header>

        <div className="ds-contact__next ds-rise" style={{ '--d': 3 }}>
          <h2 className="ds-micro">{c.next.title}</h2>
          <ol className="ds-next">
            {c.next.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        <div className="ds-contact__form ds-rise" style={{ '--d': 3 }}>
          <div className="ds-contact__panel">
            <h2 id="lead-form-title" className="ds-form__heading" tabIndex={-1}>{c.formTitle}</h2>
            <LeadForm headingId="lead-form-title" source="contact" />
          </div>
        </div>

        <div className="ds-contact__direct ds-rise" style={{ '--d': 4 }}>
          <h2 className="ds-micro">{c.direct.title}</h2>
          <a
            className="ds-contact__line"
            href={`mailto:${SITE.email}`}
            onClick={() => trackEvent('Contact', 'contact_click', 'email')}
          >
            <FiMail aria-hidden="true" />
            <span>
              <em>{c.direct.email}</em>
              <bdi dir="ltr">{SITE.email}</bdi>
            </span>
          </a>
          <a
            className="ds-contact__line"
            href={SITE.phone.href}
            onClick={() => trackEvent('Contact', 'contact_click', 'phone')}
          >
            <FiPhone aria-hidden="true" />
            <span>
              <em>{c.direct.phone}</em>
              <bdi dir="ltr">{SITE.phone.label}</bdi>
            </span>
          </a>
          <div className="ds-contact__social">
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" className="ds-link">
              <FiLinkedin aria-hidden="true" /> LinkedIn
            </a>
            <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="ds-link">
              <FiGithub aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>

        <div className="ds-contact__faq ds-rise" style={{ '--d': 5 }}>
          <h2 className="ds-micro">{c.faq.title}</h2>
          {c.faq.items.map((item) => (
            <details key={item.q} className="ds-faq__item">
              <summary className="ds-faq__q">
                <h3>{item.q}</h3>
                <span className="ds-faq__icon" aria-hidden="true">+</span>
              </summary>
              <p className="ds-faq__a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
