import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiArrowDown, FiCheck, FiClock, FiLayers, FiSmile, FiTrendingUp, FiZap, FiCpu, FiMail, FiPhone,
} from 'react-icons/fi';
import useReveal from '../../hooks/useReveal';
import useReducedMotion from '../../hooks/useReducedMotion';
import useSeo from '../../hooks/useSeo';
import { trackEvent } from '../../analytics';
import { LOCALES, LOCALE_ORDER } from '../../i18n/locales';
import { ServicesTextProvider } from './i18n';
import site from './site';
import SectionHeading from './components/SectionHeading';
import SystemMap from './components/SystemMap';
import SolutionSection from './components/SolutionSection';
import AutomationDemo from './components/AutomationDemo';
import CaseStudy from './components/CaseStudy';
import BuildExplorer from './components/BuildExplorer';
import Faq from './components/Faq';
import LeadForm from './components/LeadForm';
import StickyCta from './components/StickyCta';
import './services.css';

const OUTCOME_ICONS = [FiClock, FiLayers, FiSmile, FiTrendingUp, FiZap, FiCpu];

// While the page is mounted, the whole document takes its language and direction
// (navbar, footer and scrollbars included), and RTL scripts get their web font.
const useDocumentLocale = (locale) => {
  useEffect(() => {
    const html = document.documentElement;
    const prev = { lang: html.lang, dir: html.dir };
    html.lang = locale;
    html.dir = LOCALES[locale].dir;

    let link = null;
    if (site.fonts[locale] && !document.querySelector(`link[href="${site.fonts[locale]}"]`)) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = site.fonts[locale];
      document.head.appendChild(link);
    }
    return () => {
      html.lang = prev.lang || 'en';
      html.dir = prev.dir || 'ltr';
    };
  }, [locale]);
};

const LanguageSwitcher = ({ locale, label }) => (
  <nav className="svc-lang" aria-label={label}>
    {LOCALE_ORDER.map((code) => (
      <Link
        key={code}
        to={LOCALES[code].servicesPath}
        lang={code}
        hrefLang={code}
        aria-current={code === locale ? 'page' : undefined}
        onClick={() => code !== locale && trackEvent('Services', 'language_switch', `${locale}->${code}`)}
      >
        {LOCALES[code].name}
      </Link>
    ))}
  </nav>
);

const ServicesPage = ({ locale = 'en', content: t }) => {
  const rootRef = useRef(null);
  const [preset, setPreset] = useState(null);
  const reduced = useReducedMotion();
  const { dir } = LOCALES[locale];
  const text = useMemo(() => ({ t, locale }), [t, locale]);

  useDocumentLocale(locale);
  useReveal(rootRef);
  useSeo({
    title: t.meta.title,
    description: t.meta.description,
    url: `${site.siteUrl}${LOCALES[locale].servicesPath}`,
    image: `${site.siteUrl}${t.meta.ogImage}`,
    locale: t.meta.ogLocale,
    alternates: LOCALE_ORDER.map((code) => ({ hrefLang: code, href: `${site.siteUrl}${LOCALES[code].servicesPath}` })),
  });

  // Every "talk to me" CTA funnels here: remember what was clicked, scroll to the form,
  // and move focus to its heading so keyboard and screen-reader users land in the right place.
  const requestService = useCallback(
    (e, { need, note, source }) => {
      e.preventDefault();
      trackEvent('Services', source === 'hero' || source === 'sticky' ? 'cta_click' : 'service_cta_click', source);
      if (need || note) setPreset({ need, note, source, nonce: Date.now() });
      document.getElementById('start')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      document.getElementById('start-form-title')?.focus({ preventScroll: true });
    },
    [reduced]
  );

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const labelFor = Object.fromEntries(t.solutions.map((s) => [s.id, s.label]));

  return (
    <ServicesTextProvider value={text}>
      <div className="svc" ref={rootRef} lang={locale} dir={dir}>
        {/* Hero */}
        <section id="svc-hero" className="svc-hero" aria-labelledby="svc-h1">
          <div className="svc-wrap svc-hero__grid">
            <div className="svc-hero__copy">
              <div className="svc-hero__top svc-rise">
                <p className="svc-eyebrow">{t.hero.eyebrow}</p>
                <LanguageSwitcher locale={locale} label={t.switcher.label} />
              </div>
              <h1 id="svc-h1" className="svc-h1 svc-rise" style={{ '--d': 1 }}>{t.hero.title}</h1>
              <p className="svc-lede svc-rise" style={{ '--d': 2 }}>{t.hero.lede}</p>
              <div className="svc-hero__actions svc-rise" style={{ '--d': 3 }}>
                <a href="#start" className="svc-btn svc-btn--primary svc-btn--lg" onClick={(e) => requestService(e, { source: 'hero' })}>
                  {t.hero.cta} <FiArrowRight className="svc-arrow" aria-hidden="true" />
                </a>
                <a
                  href="#solutions"
                  className="svc-btn svc-btn--ghost svc-btn--lg"
                  onClick={(e) => {
                    trackEvent('Services', 'cta_click', 'hero_explore');
                    scrollTo('solutions')(e);
                  }}
                >
                  {t.hero.ctaSecondary} <FiArrowDown aria-hidden="true" />
                </a>
              </div>
              <ul className="svc-hero__points svc-rise" style={{ '--d': 4 }}>
                {t.hero.points.map((p) => (
                  <li key={p}><FiCheck aria-hidden="true" /> {p}</li>
                ))}
              </ul>
            </div>
            <div className="svc-hero__visual svc-rise" style={{ '--d': 2 }}>
              <SystemMap />
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="svc-section" aria-labelledby="problems-title">
          <div className="svc-wrap">
            <SectionHeading id="problems-title" eyebrow={t.problems.eyebrow} title={t.problems.title} intro={t.problems.intro} />
            <ul className="svc-problems">
              {t.problems.items.map((p, i) => (
                <li key={p.quote} className="svc-problem" data-reveal style={{ '--d': i % 4 }}>
                  <p className="svc-problem__quote">{p.quote}</p>
                  <a href={`#solution-${p.target}`} className="svc-problem__fix" onClick={scrollTo(`solution-${p.target}`)}>
                    <span>{p.fix}</span>
                    <span className="svc-problem__via">{labelFor[p.target]} <FiArrowRight className="svc-arrow" aria-hidden="true" /></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="svc-answer" data-reveal>
              <h3 className="svc-answer__title">{t.problems.answerTitle}</h3>
              <p>{t.problems.answer}</p>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="svc-section svc-solutions" aria-labelledby="solutions-title">
          <div className="svc-wrap">
            <SectionHeading
              id="solutions-title"
              eyebrow={t.solutionsIntro.eyebrow}
              title={t.solutionsIntro.title}
              intro={t.solutionsIntro.intro}
            />
            <nav className="svc-toc" aria-label={t.solutionsIntro.tocLabel} data-reveal>
              {t.solutions.map((s, i) => (
                <a key={s.id} href={`#solution-${s.id}`} onClick={scrollTo(`solution-${s.id}`)}>
                  <span>{String(i + 1).padStart(2, '0')}</span> {s.label}
                </a>
              ))}
            </nav>
            {t.solutions.map((s, i) => (
              <SolutionSection key={s.id} solution={s} index={i} reverse={i % 2 === 1} onRequest={requestService} />
            ))}
          </div>
        </section>

        <AutomationDemo />

        {/* Outcomes */}
        <section className="svc-section" aria-labelledby="outcomes-title">
          <div className="svc-wrap">
            <SectionHeading id="outcomes-title" eyebrow={t.outcomes.eyebrow} title={t.outcomes.title} />
            <ul className="svc-outcomes">
              {t.outcomes.items.map((o, i) => {
                const Icon = OUTCOME_ICONS[i];
                return (
                  <li key={o.title} className="svc-outcome" data-reveal style={{ '--d': i % 3 }}>
                    <Icon className="svc-outcome__icon" aria-hidden="true" />
                    <h3>{o.title}</h3>
                    <p>{o.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="svc-section svc-band" aria-labelledby="process-title">
          <div className="svc-wrap">
            <SectionHeading id="process-title" eyebrow={t.process.eyebrow} title={t.process.title} intro={t.process.intro} />
            <ol className="svc-process" data-reveal>
              {t.process.steps.map((s, i) => (
                <li key={s.title} className="svc-process__step" style={{ '--d': i }}>
                  <span className="svc-process__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <ul className="svc-assure" data-reveal>
              {t.process.assurances.map((a) => (
                <li key={a}><FiCheck aria-hidden="true" /> {a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Selected work */}
        <section className="svc-section" aria-labelledby="work-title">
          <div className="svc-wrap">
            <SectionHeading id="work-title" eyebrow={t.work.eyebrow} title={t.work.title} intro={t.work.intro} />
            <div className="svc-cases">
              {t.work.items.map((p, i) => (
                <CaseStudy key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* What can I build? */}
        <section className="svc-section svc-band" aria-labelledby="ideas-title">
          <div className="svc-wrap">
            <SectionHeading id="ideas-title" eyebrow={t.explorer.eyebrow} title={t.explorer.title} intro={t.explorer.intro} />
            <BuildExplorer onRequest={requestService} />
          </div>
        </section>

        {/* Why */}
        <section className="svc-section" aria-labelledby="why-title">
          <div className="svc-wrap svc-why">
            <SectionHeading id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} />
            <ol className="svc-why__list">
              {t.why.items.map((w, i) => (
                <li key={w.title} data-reveal style={{ '--d': i }}>
                  <span className="svc-why__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Technology */}
        <section className="svc-section svc-section--tight" aria-labelledby="tech-title">
          <div className="svc-wrap">
            <SectionHeading id="tech-title" eyebrow={t.tech.eyebrow} title={t.tech.title} intro={t.tech.intro} />
            <dl className="svc-tech" data-reveal>
              {t.tech.groups.map((g) => (
                <div key={g.label} className="svc-tech__group">
                  <dt>{g.label}</dt>
                  {g.items.map((item) => (
                    <dd key={item} className="svc-chip" dir="ltr">{item}</dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ */}
        <section className="svc-section" aria-labelledby="faq-title">
          <div className="svc-wrap svc-faq-wrap">
            <SectionHeading id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <Faq />
          </div>
        </section>

        {/* Closing CTA + lead form */}
        <section id="start" className="svc-section svc-closing" aria-labelledby="closing-title">
          <div className="svc-wrap svc-closing__grid">
            <div className="svc-closing__copy" data-reveal>
              <p className="svc-eyebrow">{t.closing.eyebrow}</p>
              <h2 id="closing-title" className="svc-h2 svc-closing__title">{t.closing.title}</h2>
              <p className="svc-lede">{t.closing.text}</p>
              <h3 className="svc-micro">{t.closing.nextTitle}</h3>
              <ol className="svc-next">
                {t.closing.next.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ol>
              <div className="svc-direct">
                <p className="svc-micro">{t.closing.directTitle}</p>
                <a href={`mailto:${site.email}`} onClick={() => trackEvent('Services', 'contact_click', 'email')}>
                  <FiMail aria-hidden="true" /> <bdi dir="ltr">{site.email}</bdi>
                </a>
                <a href={site.phone.href} onClick={() => trackEvent('Services', 'contact_click', 'phone')}>
                  <FiPhone aria-hidden="true" /> <bdi dir="ltr">{site.phone.label}</bdi>
                </a>
              </div>
            </div>
            <div className="svc-closing__form" data-reveal>
              <h3 id="start-form-title" className="svc-form__heading" tabIndex={-1}>{t.closing.formTitle}</h3>
              <LeadForm preset={preset} />
            </div>
          </div>
        </section>

        <StickyCta heroId="svc-hero" formId="start" onRequest={requestService} />
      </div>
    </ServicesTextProvider>
  );
};

export default ServicesPage;
