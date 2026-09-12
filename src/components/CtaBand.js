import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useSite } from '../app/SiteContext';
import { trackEvent } from '../analytics';

// The closing call to action, shared by every page except contact (which is the destination).
const CtaBand = ({ source }) => {
  const { t, path } = useSite();

  return (
    <section className="ds-section ds-cta" aria-labelledby="cta-title">
      <div className="ds-wrap ds-cta__inner" data-reveal>
        <h2 id="cta-title">{t.cta.title}</h2>
        <p>{t.cta.text}</p>
        <div className="ds-actions">
          <Link
            to={path('contact')}
            className="ds-btn ds-btn--primary ds-btn--lg"
            onClick={() => trackEvent('Site', 'cta_click', `band:${source}`)}
          >
            {t.cta.primary} <FiArrowRight className="ds-arrow" aria-hidden="true" />
          </Link>
          <Link to={path('services')} className="ds-btn ds-btn--ghost ds-btn--lg">
            {t.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
