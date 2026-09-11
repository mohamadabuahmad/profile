import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { trackEvent } from '../../../analytics';

// A real project told as problem → solution → capabilities → delivered result.
const CaseStudy = ({ project, index }) => (
  <article className="svc-case" aria-labelledby={`case-${project.id}`} data-reveal style={{ '--d': index }}>
    <div className="svc-case__head">
      <p className="svc-micro">{project.kind}</p>
      <h3 id={`case-${project.id}`} className="svc-case__name">{project.name}</h3>
      <ul className="svc-chips svc-chips--quiet" aria-label="Capabilities">
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
            onClick={() => trackEvent('Services', 'case_study_click', `${project.id}: ${l.label}`)}
          >
            {l.label} <FiArrowUpRight aria-hidden="true" />
            <span className="svc-sr">(opens in a new tab)</span>
          </a>
        ))}
      </div>
    </div>

    <dl className="svc-case__body">
      <div>
        <dt>Problem</dt>
        <dd>{project.problem}</dd>
      </div>
      <div>
        <dt>Solution</dt>
        <dd>{project.solution}</dd>
      </div>
      <div>
        <dt>Delivered</dt>
        <dd>{project.result}</dd>
      </div>
    </dl>
  </article>
);

export default CaseStudy;
