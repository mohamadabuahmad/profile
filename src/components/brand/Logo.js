import React from 'react';

// The approved MohamadDev mark — "Monolith". A full square with the M cut out
// of it: the form is what remains after the complexity is removed.
//
// Drawn on the 100-unit field from the identity: leg width 30, crown depth 24,
// apex at 64, axis at 50. Do not redraw this path. See docs/brand-identity.md.
export const MARK_PATH = 'M0 0 H100 V100 H70 V24 L50 64 30 24 V100 H0 Z';

// The mark is monochrome in every application, so it simply inherits colour.
export const Mark = ({ size = 24, className = '', title }) => (
  <svg
    className={`ds-mark ${className}`.trim()}
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="currentColor"
    role={title ? 'img' : 'presentation'}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
  >
    <path d={MARK_PATH} />
  </svg>
);

// Archivo 500 / 400 with one weight step at the join, tracked -35/1000.
export const Wordmark = ({ className = '' }) => (
  <span className={`ds-wordmark ${className}`.trim()} aria-hidden="true">
    <span className="ds-wordmark__a">Mohamad</span>
    <span className="ds-wordmark__b">Dev</span>
  </span>
);

/**
 * variant:
 *   'horizontal' — symbol + wordmark (default lockup)
 *   'stacked'    — symbol above wordmark + descriptor
 *   'mark'       — symbol alone, for tight space
 */
const Logo = ({ variant = 'horizontal', size = 24, descriptor, className = '', label = 'MohamadDev' }) => {
  if (variant === 'mark') {
    return <Mark size={size} className={className} title={label} />;
  }

  return (
    <span className={`ds-logo ds-logo--${variant} ${className}`.trim()}>
      <Mark size={size} />
      <span className="ds-logo__text">
        <Wordmark />
        {descriptor ? <span className="ds-logo__descriptor">{descriptor}</span> : null}
      </span>
      <span className="ds-sr">{label}</span>
    </span>
  );
};

export default Logo;
