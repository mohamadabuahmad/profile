import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { useSite } from '../app/SiteContext';
import { trackEvent } from '../analytics';
import DeviceShot from '../components/DeviceShot';
import AutomationGraphic from '../components/AutomationGraphic';
import CtaBand from '../components/CtaBand';
import './work.css';

// Section numbers are set in mono beside the heading, as the identity specifies.
const num = (index) => String(index + 1).padStart(2, '0');

const Work = ({ work }) => {
  const { t, locale } = useSite();
  const labels = work.labels;

  return (
    <>
      <section className="ds-hero-page ds-wk-hero" aria-labelledby="work-title">
        <div className="ds-wrap">
          <p className="ds-eyebrow ds-rise">{work.hero.eyebrow}</p>
          <h1 id="work-title" className="ds-display ds-rise" style={{ '--d': 1 }}>
            {work.hero.title}
          </h1>
          <p className="ds-lede ds-rise" style={{ '--d': 2 }}>{work.hero.lede}</p>
          <p className="ds-note ds-rise" style={{ '--d': 3 }}>{work.hero.note}</p>

          {/* Contents: the same projects, as a hairline index into the page. */}
          <ol className="ds-wk-index ds-rise" style={{ '--d': 4 }}>
            {work.items.map((project, index) => (
              <li key={project.id}>
                <a className="ds-wk-index__row" href={`#${project.id}`}>
                  <span className="ds-wk-index__num ds-num">{num(index)}</span>
                  <span className="ds-wk-index__name">{project.name}</span>
                  <span className="ds-wk-index__kind ds-micro">{project.kind}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {work.items.map((project, index) => {
        const alt = index % 2 === 1;
        const scrollable = project.shots.length > 1;

        return (
          <section
            key={project.id}
            id={project.id}
            className={`ds-section ds-study${alt ? ' ds-study--alt ds-band' : ''}`}
            aria-labelledby={`${project.id}-title`}
          >
            <div className="ds-wrap">
              <header className="ds-index ds-study__head" data-reveal>
                <p className="ds-index__num ds-num">{num(index)}</p>
                <div className="ds-index__body">
                  <p className="ds-study__meta">
                    <span className="ds-micro">{project.kind}</span>
                    <span className="ds-micro">{project.year}</span>
                  </p>
                  <h2 id={`${project.id}-title`} className="ds-h2 ds-study__name">
                    {project.name}
                  </h2>
                  <ul className="ds-study__caps" aria-label={labels.capabilities}>
                    {project.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
              </header>

              <div className="ds-study__grid">
                <dl className="ds-study__statement" data-reveal>
                  <dt className="ds-micro">{labels.challenge}</dt>
                  <dd className="ds-study__lead">{project.challenge}</dd>
                </dl>

                <div className="ds-study__media" data-reveal style={{ '--d': 1 }}>
                  <div
                    className={`ds-shots ds-shots--${project.shots.length || 'none'} ds-shots--${project.shots[0]?.device || 'none'}`}
                    data-scroller={scrollable ? 'true' : undefined}
                    {...(scrollable
                      // The row scrolls horizontally on small screens, so it has to be reachable
                      // and scrollable with the keyboard as well as by swipe.
                      ? { tabIndex: 0, role: 'group', 'aria-label': `${project.name} — ${labels.shots}` }
                      : {})}
                  >
                    {project.shots.length > 0 ? (
                      project.shots.map((shot, i) => (
                        <DeviceShot key={shot.src} shot={shot} priority={index === 0 && i === 0} />
                      ))
                    ) : (
                      <AutomationGraphic steps={t.home.automation.after.slice(0, 3)} />
                    )}
                  </div>
                </div>

                <dl className="ds-study__body">
                  {['solution', 'experience', 'result'].map((key, i) => (
                    <div key={key} data-reveal style={{ '--d': i }}>
                      <dt className="ds-micro">{labels[key]}</dt>
                      <dd>{project[key]}</dd>
                    </div>
                  ))}
                </dl>

                <div className="ds-study__foot" data-reveal>
                  <div className="ds-study__tech">
                    <h3 className="ds-micro">{labels.technology}</h3>
                    <ul className="ds-chips">
                      {project.technology.map((tech) => (
                        <li key={tech} className="ds-chip" dir="ltr">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="ds-study__links">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="ds-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('Work', 'project_click', `${locale}:${project.id}`)}
                      >
                        <span className="ds-study__link-label">{link.label}</span>
                        <FiArrowUpRight className="ds-arrow" aria-hidden="true" />
                        <span className="ds-sr">{labels.newTab}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand source="work" />
    </>
  );
};

export default Work;
