import React from 'react';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { useServicesText } from '../i18n';
import { VISUALS } from './Visuals';

// Services that are told as index rows rather than full modules: same story,
// compressed to a few ruled lines so the page changes gear as it is scrolled.
const ROW_SERVICES = ['web', 'mobile'];

// One of the five services, told as an editorial story rather than a card:
// a mono number, the category label, the statement, the problem it answers,
// a visual system, example capabilities and the CTA that pre-fills the lead form.
// Each service gets its own composition (see .ds-svc--* in services.css), so the
// page changes shape as it is scrolled instead of repeating one layout five times.
const SolutionSection = ({ solution, index, onRequest }) => {
  const { t } = useServicesText();
  const isRow = ROW_SERVICES.includes(solution.id);
  const Visual = VISUALS[solution.id];
  const headingId = `solution-${solution.id}-title`;

  return (
    <article
      id={`solution-${solution.id}`}
      className={`ds-svc ds-svc--${solution.id} ${isRow ? 'ds-svc--row' : ''}`}
      aria-labelledby={headingId}
    >
      <p className="ds-svc__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>

      <header className="ds-svc__head" data-reveal>
        <p className="ds-solution__label">{solution.label}</p>
        <h3 id={headingId} className="ds-svc__title">{solution.title}</h3>
      </header>

      <div className="ds-svc__body" data-reveal style={{ '--d': 1 }}>
        <p className="ds-solution__body">{solution.body}</p>
      </div>

      <div className="ds-svc__problems" data-reveal style={{ '--d': 1 }}>
        <h4 className="ds-micro">{t.solutionsIntro.problemsLabel}</h4>
        <ul className="ds-svc__list">
          {solution.problems.map((p, i) => (
            <li key={p}>
              <span className="ds-svc__mark" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {!isRow && (
        <div className="ds-svc__visual" data-reveal style={{ '--d': 2 }}>
          <Visual />
        </div>
      )}

      <div className="ds-svc__examples" data-reveal>
        <h4 className="ds-micro">{t.solutionsIntro.examplesLabel}</h4>
        <ul className="ds-svc__caps">
          {solution.examples.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>

      <div className="ds-svc__actions" data-reveal>
        <a
          href="#start"
          className="ds-btn ds-btn--primary"
          onClick={(e) => onRequest(e, { need: solution.id, source: `service_${solution.id}` })}
        >
          {solution.cta} <FiArrowRight className="ds-arrow" aria-hidden="true" />
        </a>
        {solution.id === 'automation' && (
          <a href="#automation-demo" className="ds-link">
            {t.solutionsIntro.demoLink} <FiArrowDown aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
};

export default SolutionSection;
