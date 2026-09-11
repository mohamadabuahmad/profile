import React from 'react';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { useServicesText } from '../i18n';
import { VISUALS } from './Visuals';

// One of the five service categories: outcome headline, problems it solves,
// what the solution can look like, an illustrative visual and a CTA that pre-fills the lead form.
const SolutionSection = ({ solution, index, reverse, onRequest }) => {
  const { t } = useServicesText();
  const Visual = VISUALS[solution.id];
  const headingId = `solution-${solution.id}-title`;

  return (
    <article
      id={`solution-${solution.id}`}
      className={`svc-solution ${reverse ? 'svc-solution--reverse' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="svc-solution__copy" data-reveal>
        <p className="svc-solution__label">
          <span className="svc-solution__index">{String(index + 1).padStart(2, '0')}</span>
          {solution.label}
        </p>
        <h3 id={headingId} className="svc-solution__title">{solution.title}</h3>
        <p className="svc-solution__body">{solution.body}</p>

        <div className="svc-solution__cols">
          <div>
            <h4 className="svc-micro">{t.solutionsIntro.problemsLabel}</h4>
            <ul className="svc-solution__problems">
              {solution.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="svc-micro">{t.solutionsIntro.examplesLabel}</h4>
            <ul className="svc-chips">
              {solution.examples.map((e) => (
                <li key={e} className="svc-chip">{e}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="svc-solution__actions">
          <a
            href="#start"
            className="svc-btn svc-btn--primary"
            onClick={(e) => onRequest(e, { need: solution.id, source: `service_${solution.id}` })}
          >
            {solution.cta} <FiArrowRight className="svc-arrow" aria-hidden="true" />
          </a>
          {solution.id === 'automation' && (
            <a href="#automation-demo" className="svc-link">
              {t.solutionsIntro.demoLink} <FiArrowDown aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="svc-solution__visual" data-reveal>
        <Visual />
      </div>
    </article>
  );
};

export default SolutionSection;
