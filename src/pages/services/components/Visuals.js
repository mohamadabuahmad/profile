import React from 'react';
import { FiFileText, FiBell, FiCheck, FiGrid, FiBox, FiCalendar, FiUsers, FiSettings } from 'react-icons/fi';
import { useServicesText } from '../i18n';

// Illustrative, CSS-drawn product visuals for each solution. They are decorative
// (aria-hidden); the visible caption says what the example shows. Layouts use
// logical properties, so each one mirrors naturally in Arabic and Hebrew.

const Frame = ({ caption, className, children }) => (
  <figure className={`svc-visual ${className}`}>
    <div className="svc-visual__stage" aria-hidden="true">{children}</div>
    <figcaption className="svc-visual__caption">{caption}</figcaption>
  </figure>
);

export const AiVisual = () => {
  const v = useServicesText().t.visuals.ai;
  return (
    <Frame className="svc-visual--ai" caption={v.caption}>
      <div className="svc-chat">
        <div className="svc-chat__bar">
          <span className="svc-dot svc-dot--live" />
          {v.bar}
        </div>
        <p className="svc-chat__msg svc-chat__msg--user">{v.question}</p>
        <div className="svc-chat__msg svc-chat__msg--ai">
          <span className="svc-chat__typing">
            <i />
            <i />
            <i />
          </span>
          <span className="svc-chat__answer">{v.answer}</span>
          <span className="svc-chat__source">
            <FiFileText /> {v.source}
          </span>
        </div>
      </div>
    </Frame>
  );
};

export const AutomationVisual = () => {
  const v = useServicesText().t.visuals.automation;
  return (
    <Frame className="svc-visual--automation" caption={v.caption}>
      <div className="svc-bus">
        <ul className="svc-bus__side svc-bus__side--in">
          {v.sources.map((s, i) => (
            <li key={s} style={{ '--d': i }}>{s}</li>
          ))}
        </ul>
        <div className="svc-bus__hub">
          <span className="svc-bus__hub-title">{v.hubTitle}</span>
          {v.hubVerbs.map((verb) => (
            <span key={verb}>{verb}</span>
          ))}
        </div>
        <ul className="svc-bus__side svc-bus__side--out">
          {v.actions.map((s, i) => (
            <li key={s} style={{ '--d': i }}>
              <FiCheck /> {s}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
};

export const WebVisual = () => {
  const v = useServicesText().t.visuals.web;
  return (
    <Frame className="svc-visual--web" caption={v.caption}>
      <div className="svc-browser">
        <div className="svc-browser__bar">
          <span />
          <span />
          <span />
          <em dir="ltr">{v.url}</em>
        </div>
        <div className="svc-browser__page">
          <div className="svc-wire svc-wire--nav"><i /><i /><i /></div>
          <div className="svc-wire svc-wire--hero">
            <b className="svc-pin">1</b>
            <i className="svc-wire__h" />
            <i className="svc-wire__p" />
            <span className="svc-wire__btn">
              {v.button}
              <b className="svc-pin svc-pin--btn">3</b>
            </span>
          </div>
          <div className="svc-wire svc-wire--proof">
            <b className="svc-pin">2</b>
            <i /><i /><i />
          </div>
        </div>
      </div>
      <ol className="svc-legend">
        {v.legend.map((item, i) => (
          <li key={item}><b>{i + 1}</b> {item}</li>
        ))}
      </ol>
    </Frame>
  );
};

export const WebAppVisual = () => {
  const v = useServicesText().t.visuals.webapp;
  return (
    <Frame className="svc-visual--webapp" caption={v.caption}>
      <div className="svc-dash">
        <nav className="svc-dash__side">
          <span className="svc-dash__logo" />
          <FiGrid /><FiBox /><FiCalendar /><FiUsers /><FiSettings />
        </nav>
        <div className="svc-dash__main">
          <div className="svc-dash__top"><i /><span className="svc-dash__avatar" /></div>
          <div className="svc-dash__tiles">
            {v.tiles.map((tile) => (
              <div key={tile} className="svc-dash__tile">
                <span>{tile}</span>
                <i />
              </div>
            ))}
          </div>
          <div className="svc-dash__chart">
            {[42, 58, 50, 72, 64, 86, 78].map((h, i) => (
              <i key={i} style={{ '--h': `${h}%`, '--d': i }} />
            ))}
          </div>
          <ul className="svc-dash__table">
            {v.rows.map((r) => (
              <li key={r.name}>
                <span>{r.name}</span>
                <i />
                <em className={`svc-status svc-status--${r.tone}`}>{r.status}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
};

export const MobileVisual = () => {
  const v = useServicesText().t.visuals.mobile;
  return (
    <Frame className="svc-visual--mobile" caption={v.caption}>
      <div className="svc-phone">
        <div className="svc-phone__notch" />
        <div className="svc-phone__screen">
          <div className="svc-phone__toast">
            <FiBell /> <span>{v.toast}</span>
          </div>
          <p className="svc-phone__title">{v.title}</p>
          {v.cards.map((c) => (
            <div key={c.time} className="svc-phone__card">
              <span className="svc-phone__day">{c.day}</span>
              <span>
                <strong className="svc-num">{c.time}</strong>
                <em>{c.label}</em>
              </span>
            </div>
          ))}
          <span className="svc-phone__btn">{v.button}</span>
        </div>
      </div>
    </Frame>
  );
};

export const VISUALS = {
  ai: AiVisual,
  automation: AutomationVisual,
  web: WebVisual,
  webapp: WebAppVisual,
  mobile: MobileVisual,
};
