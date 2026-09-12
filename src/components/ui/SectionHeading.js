import React from 'react';

/**
 * Eyebrow + H2 + optional intro, used by every section on the site.
 *
 * `index` sets the identity's numbered-section treatment: a mono index on a
 * hairline rule, with the heading set beside it. The number is decorative —
 * it carries no meaning a screen reader needs.
 */
const SectionHeading = ({ id, eyebrow, title, intro, index, align = 'start', children }) => {
  const body = (
    <>
      {eyebrow && <p className="ds-eyebrow">{eyebrow}</p>}
      <h2 id={id} className="ds-h2">{title}</h2>
      {intro && <p className="ds-intro">{intro}</p>}
      {children}
    </>
  );

  if (index != null) {
    return (
      <header className="ds-heading ds-index" data-reveal>
        <span className="ds-index__num" aria-hidden="true">{String(index).padStart(2, '0')}</span>
        <div className="ds-index__body">{body}</div>
      </header>
    );
  }

  return (
    <header className={`ds-heading ds-heading--${align}`} data-reveal>
      {body}
    </header>
  );
};

export default SectionHeading;
