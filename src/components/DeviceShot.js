import React from 'react';

// A real screenshot inside a phone or browser frame. Images are WebP at 1x and 2x,
// lazy-loaded, with width/height set so nothing shifts while they load.
const SIZES = {
  phone: { width: 240, height: 476 },
  browser: { width: 560, height: 380 },
};

const DeviceShot = ({ shot, priority = false, className = '' }) => {
  const { src, alt, device = 'phone' } = shot;
  const { width, height } = SIZES[device];

  const image = (
    <img
      className="ds-device__screen"
      src={`${src}.webp`}
      srcSet={`${src}.webp 1x, ${src}@2x.webp 2x`}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  if (device === 'browser') {
    return (
      <div className={`ds-device ds-device--browser ${className}`}>
        <div className="ds-device__chrome" aria-hidden="true">
          <i /><i /><i />
          <span />
        </div>
        {image}
      </div>
    );
  }

  return <div className={`ds-device ds-device--phone ${className}`}>{image}</div>;
};

export default DeviceShot;
