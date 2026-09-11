import React, { useCallback, useRef, useState } from 'react';
import {
  FiArrowRight, FiArrowDown, FiCheck, FiClock, FiLayers, FiTrendingUp, FiZap, FiCpu, FiKey, FiMail, FiPhone,
} from 'react-icons/fi';
import useReveal from '../../hooks/useReveal';
import useReducedMotion from '../../hooks/useReducedMotion';
import useSeo from '../../hooks/useSeo';
import { trackEvent } from '../../analytics';
import seo from './seo.json';
import {
  hero, problems, solutions, outcomes, process, work, explorer, why, tech, closing,
} from './content';
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

const OUTCOME_ICONS = [FiClock, FiLayers, FiTrendingUp, FiZap, FiCpu, FiKey];
const SOLUTION_LABELS = Object.fromEntries(solutions.map((s) => [s.id, s.label]));

const ServicesPage = () => {
  const rootRef = useRef(null);
  const [preset, setPreset] = useState(null);
  const reduced = useReducedMotion();
  useReveal(rootRef);
  useSeo({
    title: seo.title,
    description: seo.description,
    url: `${seo.siteUrl}${seo.path}`,
    image: `${seo.siteUrl}${seo.ogImage}`,
  });

  // Every "talk to me" CTA funnels here: remember what was clicked, scroll to the form,
  // and move focus to its heading so keyboard and screen-reader users land in the right place.
  const requestService = useCallback(
    (e, { need, note, source }) => {
      e.preventDefault();
      trackEvent('Services', source === 'hero' || source === 'sticky' ? 'cta_click' : 'service_cta_click', source);
      if (need || note) setPreset({ need, note, source, nonce: Date.now() });
      const target = document.getElementById('start');
      target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      document.getElementById('start-form-title')?.focus({ preventScroll: true });
    },
    [reduced]
  );

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="svc" ref={rootRef}>
      {/* 01 — Hero */}
      <section id="svc-hero" className="svc-hero" aria-labelledby="svc-h1">
        <div className="svc-wrap svc-hero__grid">
          <div className="svc-hero__copy">
            <p className="svc-eyebrow svc-rise">{hero.eyebrow}</p>
            <h1 id="svc-h1" className="svc-h1 svc-rise" style={{ '--d': 1 }}>{hero.title}</h1>
            <p className="svc-lede svc-rise" style={{ '--d': 2 }}>{hero.lede}</p>
            <div className="svc-hero__actions svc-rise" style={{ '--d': 3 }}>
              <a href="#start" className="svc-btn svc-btn--primary svc-btn--lg" onClick={(e) => requestService(e, { source: 'hero' })}>
                Let&apos;s Build Your Solution <FiArrowRight aria-hidden="true" />
              </a>
              <a
                href="#solutions"
                className="svc-btn svc-btn--ghost svc-btn--lg"
                onClick={(e) => {
                  trackEvent('Services', 'cta_click', 'hero_explore');
                  scrollTo('solutions')(e);
                }}
              >
                Explore Services <FiArrowDown aria-hidden="true" />
              </a>
            </div>
            <ul className="svc-hero__points svc-rise" style={{ '--d': 4 }}>
              {hero.points.map((p) => (
                <li key={p}><FiCheck aria-hidden="true" /> {p}</li>
              ))}
            </ul>
          </div>
          <div className="svc-hero__visual svc-rise" style={{ '--d': 2 }}>
            <SystemMap />
          </div>
        </div>
      </section>

      {/* 02 — Problems */}
      <section className="svc-section" aria-labelledby="problems-title">
        <div className="svc-wrap">
          <SectionHeading id="problems-title" eyebrow={problems.eyebrow} title={problems.title} intro={problems.intro} />
          <ul className="svc-problems">
            {problems.items.map((p, i) => (
              <li key={p.quote} className="svc-problem" data-reveal style={{ '--d': i % 4 }}>
                <p className="svc-problem__quote">“{p.quote}”</p>
                <a href={`#solution-${p.target}`} className="svc-problem__fix" onClick={scrollTo(`solution-${p.target}`)}>
                  <span>{p.fix}</span>
                  <span className="svc-problem__via">{SOLUTION_LABELS[p.target]} <FiArrowRight aria-hidden="true" /></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="svc-answer" data-reveal>
            <h3 className="svc-answer__title">{problems.answerTitle}</h3>
            <p>{problems.answer}</p>
          </div>
        </div>
      </section>

      {/* 03 — Solutions */}
      <section id="solutions" className="svc-section svc-solutions" aria-labelledby="solutions-title">
        <div className="svc-wrap">
          <SectionHeading
            id="solutions-title"
            eyebrow="What I build"
            title="Five ways I can help your business."
            intro="Most projects fit one of these — many combine two. Not sure which is yours? That's normal. Start with the problem."
          />
          <nav className="svc-toc" aria-label="Services on this page" data-reveal>
            {solutions.map((s) => (
              <a key={s.id} href={`#solution-${s.id}`} onClick={scrollTo(`solution-${s.id}`)}>
                <span>{s.index}</span> {s.label}
              </a>
            ))}
          </nav>
          {solutions.map((s, i) => (
            <SolutionSection key={s.id} solution={s} reverse={i % 2 === 1} onRequest={requestService} />
          ))}
        </div>
      </section>

      {/* 04 — Automation demo */}
      <AutomationDemo />

      {/* 05 — Outcomes */}
      <section className="svc-section" aria-labelledby="outcomes-title">
        <div className="svc-wrap">
          <SectionHeading id="outcomes-title" eyebrow={outcomes.eyebrow} title={outcomes.title} />
          <ul className="svc-outcomes">
            {outcomes.items.map((o, i) => {
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

      {/* 06 — Process */}
      <section className="svc-section svc-band" aria-labelledby="process-title">
        <div className="svc-wrap">
          <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} intro={process.intro} />
          <ol className="svc-process" data-reveal>
            {process.steps.map((s, i) => (
              <li key={s.title} className="svc-process__step" style={{ '--d': i }}>
                <span className="svc-process__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <ul className="svc-assure" data-reveal>
            {process.assurances.map((a) => (
              <li key={a}><FiCheck aria-hidden="true" /> {a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — Selected work */}
      <section className="svc-section" aria-labelledby="work-title">
        <div className="svc-wrap">
          <SectionHeading id="work-title" eyebrow={work.eyebrow} title={work.title} intro={work.intro} />
          <div className="svc-cases">
            {work.items.map((p, i) => (
              <CaseStudy key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 08 — What can I build? */}
      <section className="svc-section svc-band" aria-labelledby="ideas-title">
        <div className="svc-wrap">
          <SectionHeading id="ideas-title" eyebrow={explorer.eyebrow} title={explorer.title} intro={explorer.intro} />
          <BuildExplorer onRequest={requestService} />
        </div>
      </section>

      {/* 09 — Why Mohamad Dev */}
      <section className="svc-section" aria-labelledby="why-title">
        <div className="svc-wrap svc-why">
          <SectionHeading id="why-title" eyebrow={why.eyebrow} title={why.title} />
          <ol className="svc-why__list">
            {why.items.map((w, i) => (
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

      {/* 10 — Technology */}
      <section className="svc-section svc-section--tight" aria-labelledby="tech-title">
        <div className="svc-wrap">
          <SectionHeading id="tech-title" eyebrow={tech.eyebrow} title={tech.title} intro={tech.intro} />
          <dl className="svc-tech" data-reveal>
            {tech.groups.map((g) => (
              <div key={g.label} className="svc-tech__group">
                <dt>{g.label}</dt>
                {g.items.map((t) => (
                  <dd key={t} className="svc-chip">{t}</dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="svc-section" aria-labelledby="faq-title">
        <div className="svc-wrap svc-faq-wrap">
          <SectionHeading id="faq-title" eyebrow="Questions" title="Things people usually ask first." />
          <Faq />
        </div>
      </section>

      {/* 12 — Closing CTA + lead form */}
      <section id="start" className="svc-section svc-closing" aria-labelledby="closing-title">
        <div className="svc-wrap svc-closing__grid">
          <div className="svc-closing__copy" data-reveal>
            <p className="svc-eyebrow">{closing.eyebrow}</p>
            <h2 id="closing-title" className="svc-h2 svc-closing__title">{closing.title}</h2>
            <p className="svc-lede">{closing.text}</p>
            <h3 className="svc-micro">What happens next</h3>
            <ol className="svc-next">
              {closing.next.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ol>
            <div className="svc-direct">
              <p className="svc-micro">Prefer to reach out directly?</p>
              <a href={`mailto:${closing.email}`} onClick={() => trackEvent('Services', 'contact_click', 'email')}>
                <FiMail aria-hidden="true" /> {closing.email}
              </a>
              <a href={closing.phone.href} onClick={() => trackEvent('Services', 'contact_click', 'phone')}>
                <FiPhone aria-hidden="true" /> <bdi>{closing.phone.label}</bdi>
              </a>
            </div>
          </div>
          <div className="svc-closing__form" data-reveal>
            <h3 id="start-form-title" className="svc-form__heading" tabIndex={-1}>Tell me what you want to solve</h3>
            <LeadForm preset={preset} />
          </div>
        </div>
      </section>

      <StickyCta heroId="svc-hero" formId="start" onRequest={requestService} />
    </div>
  );
};

export default ServicesPage;
