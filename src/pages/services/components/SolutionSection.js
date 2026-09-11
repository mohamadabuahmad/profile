import React from 'react';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { VISUALS } from './Visuals';

// One of the five service categories: outcome headline, problems it solves,
// what the solution can look like, an illustrative visual and a CTA that pre-fills the lead form.
const SolutionSection = ({ solution, reverse, onRequest }) => {
  const Visual = VISUALS[solution.visual];
  const headingId = `solution-${solution.id}-title`;

  return (
    <article
      id={`solution-${solution.id}`}
      className={`svc-solution ${reverse ? 'svc-solution--reverse' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="svc-solution__copy" data-reveal>
        <p className="svc-solution__label">
          <span className="svc-solution__index">{solution.index}</span>
          {solution.label}
        </p>
        <h3 id={headingId} className="svc-solution__title">{solution.title}</h3>
        <p className="svc-solution__body">{solution.body}</p>

        <div className="svc-solution__cols">
          <div>
            <h4 className="svc-micro">Problems it solves</h4>
            <ul className="svc-solution__problems">
              {solution.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="svc-micro">What it can look like</h4>
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
            {solution.cta} <FiArrowRight aria-hidden="true" />
          </a>
          {solution.demoLink && (
            <a href="#automation-demo" className="svc-link">
              See an example <FiArrowDown aria-hidden="true" />
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
