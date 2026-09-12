import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useServicesText } from '../i18n';

// Mobile-only bar that keeps the main CTA within reach once the hero has scrolled away.
// It hides again when the lead form is on screen or already passed.
const StickyCta = ({ heroId, formId, onRequest }) => {
  const { t } = useServicesText();
  const [heroGone, setHeroGone] = useState(false);
  const [formReached, setFormReached] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const form = document.getElementById(formId);
    if (!hero || !form) return undefined;
    const heroIo = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const formIo = new IntersectionObserver(([e]) => setFormReached(e.isIntersecting || e.boundingClientRect.top < 0));
    heroIo.observe(hero);
    formIo.observe(form);
    return () => {
      heroIo.disconnect();
      formIo.disconnect();
    };
  }, [heroId, formId]);

  const visible = heroGone && !formReached;

  return (
    <div className={`ds-sticky ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <a
        href={`#${formId}`}
        className="ds-btn ds-btn--primary ds-btn--block"
        tabIndex={visible ? 0 : -1}
        onClick={(e) => onRequest(e, { source: 'sticky' })}
      >
        {t.sticky} <FiArrowRight className="ds-arrow" aria-hidden="true" />
      </a>
    </div>
  );
};

export default StickyCta;
