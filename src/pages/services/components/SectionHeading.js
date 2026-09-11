import React from 'react';

// Eyebrow + H2 + optional intro, shared by every section on the page.
const SectionHeading = ({ id, eyebrow, title, intro, align = 'start', children }) => (
  <header className={`svc-heading svc-heading--${align}`} data-reveal>
    {eyebrow && <p className="svc-eyebrow">{eyebrow}</p>}
    <h2 id={id} className="svc-h2">{title}</h2>
    {intro && <p className="svc-intro">{intro}</p>}
    {children}
  </header>
);

export default SectionHeading;
