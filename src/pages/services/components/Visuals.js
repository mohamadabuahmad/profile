import React from 'react';
import { useServicesText } from '../i18n';

// One drawn visual system per service. They are built from hairlines, rectangles,
// nodes and mono text only — monochrome, no illustration, no colour. The stage is
// decorative (aria-hidden); the visible caption says what the example shows.
// Layouts use logical properties, so each one mirrors naturally in Arabic and Hebrew.

const Frame = ({ caption, className, children }) => (
  <figure className={`ds-visual ${className}`}>
    <div className="ds-visual__stage" aria-hidden="true">{children}</div>
    <figcaption className="ds-visual__caption">{caption}</figcaption>
  </figure>
);

// A question answered from the business's own documents, set as a transcript.
export const AiVisual = () => {
  const v = useServicesText().t.visuals.ai;
  return (
    <Frame className="ds-visual--ai" caption={v.caption}>
      <div className="ds-chat">
        <div className="ds-chat__bar">
          <span className="ds-dot ds-dot--live" />
          {v.bar}
        </div>
        <div className="ds-chat__row ds-chat__msg--user">
          <span className="ds-chat__key">Q</span>
          <p className="ds-chat__msg">{v.question}</p>
        </div>
        <div className="ds-chat__row ds-chat__msg--ai">
          <span className="ds-chat__key">A</span>
          <div className="ds-chat__msg">
            <span className="ds-chat__typing">
              <i />
              <i />
              <i />
            </span>
            <span className="ds-chat__answer">{v.answer}</span>
          </div>
        </div>
        <p className="ds-chat__source">{v.source}</p>
      </div>
    </Frame>
  );
};

// Inputs on one side, actions on the other, one automation layer between them.
export const AutomationVisual = () => {
  const v = useServicesText().t.visuals.automation;
  return (
    <Frame className="ds-visual--automation" caption={v.caption}>
      <div className="ds-bus">
        <ul className="ds-bus__side ds-bus__side--in">
          {v.sources.map((s, i) => (
            <li key={s} style={{ '--d': i }}>{s}</li>
          ))}
        </ul>
        <div className="ds-bus__hub">
          <span className="ds-bus__hub-title">{v.hubTitle}</span>
          <span className="ds-bus__verbs">
            {v.hubVerbs.map((verb) => (
              <span key={verb}>{verb}</span>
            ))}
          </span>
        </div>
        <ul className="ds-bus__side ds-bus__side--out">
          {v.actions.map((s, i) => (
            <li key={s} style={{ '--d': i }}>{s}</li>
          ))}
        </ul>
      </div>
    </Frame>
  );
};

// A page wireframe with the three things a converting page has to get right.
export const WebVisual = () => {
  const v = useServicesText().t.visuals.web;
  return (
    <Frame className="ds-visual--web" caption={v.caption}>
      <div className="ds-browser">
        <div className="ds-browser__bar">
          <em dir="ltr">{v.url}</em>
        </div>
        <div className="ds-browser__page">
          <div className="ds-wire ds-wire--nav"><i /><i /><i /></div>
          <div className="ds-wire ds-wire--hero">
            <b className="ds-pin">1</b>
            <i className="ds-wire__h" />
            <i className="ds-wire__p" />
            <span className="ds-wire__btn">
              {v.button}
              <b className="ds-pin ds-pin--btn">3</b>
            </span>
          </div>
          <div className="ds-wire ds-wire--proof">
            <b className="ds-pin">2</b>
            <i /><i /><i />
          </div>
        </div>
      </div>
      <ol className="ds-legend">
        {v.legend.map((item, i) => (
          <li key={item}><b>{i + 1}</b> {item}</li>
        ))}
      </ol>
    </Frame>
  );
};

// The operational screen a custom application replaces spreadsheets with.
export const WebAppVisual = () => {
  const v = useServicesText().t.visuals.webapp;
  return (
    <Frame className="ds-visual--webapp" caption={v.caption}>
      <div className="ds-dash">
        <div className="ds-dash__side">
          <span className="ds-dash__logo" />
          <i /><i /><i /><i />
        </div>
        <div className="ds-dash__main">
          <div className="ds-dash__top"><i /><span className="ds-dash__avatar" /></div>
          <div className="ds-dash__tiles">
            {v.tiles.map((tile) => (
              <div key={tile} className="ds-dash__tile">
                <span>{tile}</span>
                <i />
              </div>
            ))}
          </div>
          <div className="ds-dash__chart">
            {[42, 58, 50, 72, 64, 86, 78].map((h, i) => (
              <i key={h + i} style={{ '--h': `${h}%`, '--d': i }} />
            ))}
          </div>
          <ul className="ds-dash__table">
            {v.rows.map((r) => (
              <li key={r.name}>
                <span>{r.name}</span>
                <i />
                <em className={`ds-status ds-status--${r.tone}`}>{r.status}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
};

// The same business, in the customer's hand.
export const MobileVisual = () => {
  const v = useServicesText().t.visuals.mobile;
  return (
    <Frame className="ds-visual--mobile" caption={v.caption}>
      <div className="ds-phone">
        <div className="ds-phone__notch" />
        <div className="ds-phone__screen">
          <p className="ds-phone__title">{v.title}</p>
          {v.cards.map((c) => (
            <div key={c.time} className="ds-phone__card">
              <span className="ds-phone__day">{c.day}</span>
              <span>
                <strong className="ds-num">{c.time}</strong>
                <em>{c.label}</em>
              </span>
            </div>
          ))}
          <div className="ds-phone__toast">{v.toast}</div>
          <span className="ds-phone__btn">{v.button}</span>
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
