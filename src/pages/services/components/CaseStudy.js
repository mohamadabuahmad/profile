import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { trackEvent } from '../../../analytics';
import { useServicesText } from '../i18n';

// A real project told as problem → solution → capabilities → delivered result.
const CaseStudy = ({ project, index }) => {
  const { t, locale } = useServicesText();
  const labels = t.work.labels;

  return (
    <article className="svc-case" aria-labelledby={`case-${project.id}`} data-reveal style={{ '--d': index }}>
      <div className="svc-case__head">
        <p className="svc-micro">{project.kind}</p>
        <h3 id={`case-${project.id}`} className="svc-case__name">{project.name}</h3>
        <ul className="svc-chips svc-chips--quiet" aria-label={labels.capabilities}>
          {project.capabilities.map((c) => (
            <li key={c} className="svc-chip">{c}</li>
          ))}
        </ul>
        <div className="svc-case__links">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="svc-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('Services', 'case_study_click', `${locale}:${project.id}:${l.href.split('/').pop()}`)}
            >
              {l.label} <FiArrowUpRight className="svc-arrow" aria-hidden="true" />
              <span className="svc-sr">{labels.newTab}</span>
            </a>
          ))}
        </div>
      </div>

      <dl className="svc-case__body">
        <div>
          <dt>{labels.problem}</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt>{labels.solution}</dt>
          <dd>{project.solution}</dd>
        </div>
        <div>
          <dt>{labels.delivered}</dt>
          <dd>{project.result}</dd>
        </div>
      </dl>
    </article>
  );
};

export default CaseStudy;
