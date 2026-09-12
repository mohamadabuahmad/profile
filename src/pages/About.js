import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { useSite } from '../app/SiteContext';
import { trackEvent } from '../analytics';
import SectionHeading from '../components/ui/SectionHeading';
import CtaBand from '../components/CtaBand';
import './about.css';

const About = () => {
  const { t, path } = useSite();
  const a = t.about;

  return (
    <>
      {/* Opening statement — the page header is the statement, the portrait is the counterweight. */}
      <section className="ds-hero-page ds-about-hero" aria-labelledby="about-title">
        <div className="ds-wrap ds-about-hero__grid">
          <div className="ds-about-hero__copy">
            <p className="ds-eyebrow ds-rise">{a.hero.eyebrow}</p>
            <h1 id="about-title" className="ds-display ds-about-hero__title ds-rise" style={{ '--d': 1 }}>
              {a.hero.title}
            </h1>
            <p className="ds-lede ds-about-hero__lede ds-rise" style={{ '--d': 2 }}>{a.hero.lede}</p>
            <div className="ds-actions ds-rise" style={{ '--d': 3 }}>
              <Link to={path('contact')} className="ds-btn ds-btn--primary">
                {t.cta.primary} <FiArrowRight className="ds-arrow" aria-hidden="true" />
              </Link>
              <a
                href={`${process.env.PUBLIC_URL}/CV.pdf`}
                className="ds-btn ds-btn--ghost"
                download
                onClick={() => trackEvent('About', 'cv_download', 'about')}
              >
                <FiDownload aria-hidden="true" /> {a.cv}
              </a>
            </div>
          </div>

          <figure className="ds-portrait ds-rise" style={{ '--d': 2 }}>
            <div className="ds-portrait__frame">
              <img
                src={`${process.env.PUBLIC_URL}/profile_pic.jpg`}
                alt={a.hero.photoAlt}
                width="420"
                height="525"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="ds-portrait__caption" aria-hidden="true">{a.hero.photoAlt}</figcaption>
          </figure>
        </div>
      </section>

      {/* How I think — a numbered editorial list on hairlines, not a card grid. */}
      <section className="ds-section ds-band" aria-labelledby="principles-title">
        <div className="ds-wrap">
          <SectionHeading
            id="principles-title"
            index={1}
            eyebrow={a.principles.eyebrow}
            title={a.principles.title}
          />
          <ol className="ds-principles">
            {a.principles.items.map((item, i) => (
              <li key={item.title} data-reveal style={{ '--d': i }}>
                <span className="ds-principles__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ds-principles__title">{item.title}</h3>
                <p className="ds-principles__text">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experience and education — set as a record, one row per entry. */}
      <section className="ds-section" aria-labelledby="timeline-title">
        <div className="ds-wrap ds-split">
          <div className="ds-split__media">
            <SectionHeading
              id="timeline-title"
              index={2}
              eyebrow={a.timeline.eyebrow}
              title={a.timeline.title}
            />
          </div>
          <ol className="ds-timeline">
            {a.timeline.items.map((item, i) => (
              <li key={`${item.role}-${item.period}`} data-reveal style={{ '--d': i }}>
                <p className="ds-timeline__meta">
                  <span className="ds-timeline__tag">{item.tag}</span>
                  <span className="ds-timeline__period" dir="ltr">{item.period}</span>
                </p>
                <div className="ds-timeline__body">
                  <h3 className="ds-timeline__role">{item.role}</h3>
                  <p className="ds-timeline__org">{item.org}</p>
                  <p className="ds-timeline__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Technology — a specification sheet: label on the left rule, inventory beside it. */}
      <section className="ds-section ds-band" aria-labelledby="about-tech-title">
        <div className="ds-wrap">
          <SectionHeading
            id="about-tech-title"
            index={3}
            eyebrow={a.capabilities.eyebrow}
            title={a.capabilities.title}
          />
          <dl className="ds-tech-groups">
            {a.capabilities.groups.map((group, i) => (
              <div key={group.label} className="ds-tech-groups__row" data-reveal style={{ '--d': i }}>
                <dt className="ds-tech-groups__label">{group.label}</dt>
                <dd className="ds-tech-groups__items">
                  <ul className="ds-chips">
                    {group.items.map((item) => (
                      <li key={item} className="ds-chip" dir="ltr">{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Working languages — three scripts, set at display size. */}
      <section className="ds-section ds-section--tight" aria-labelledby="languages-title">
        <div className="ds-wrap">
          <div className="ds-languages ds-index" data-reveal>
            <span className="ds-index__num" aria-hidden="true">04</span>
            <div className="ds-index__body ds-languages__body">
              <p className="ds-eyebrow">{a.languages.eyebrow}</p>
              <h2 id="languages-title" className="ds-h2">{a.languages.title}</h2>
              <p className="ds-languages__row" aria-hidden="true">
                <span lang="en">English</span>
                <span lang="ar">العربية</span>
                <span lang="he">עברית</span>
              </p>
              <p className="ds-lede">{a.languages.text}</p>
              <Link to={path('work')} className="ds-link ds-languages__cta">
                {a.languages.cta} <FiArrowRight className="ds-arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand source="about" />
    </>
  );
};

export default About;
