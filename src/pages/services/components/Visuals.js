import React from 'react';
import { FiFileText, FiBell, FiCheck, FiGrid, FiBox, FiCalendar, FiUsers, FiSettings } from 'react-icons/fi';

// Illustrative, CSS-drawn product visuals for each solution. They are decorative
// (aria-hidden); the visible caption says what the example shows.

const Frame = ({ caption, className, children }) => (
  <figure className={`svc-visual ${className}`}>
    <div className="svc-visual__stage" aria-hidden="true">{children}</div>
    <figcaption className="svc-visual__caption">{caption}</figcaption>
  </figure>
);

export const AiVisual = () => (
  <Frame className="svc-visual--ai" caption="Example: an assistant that answers from your own documents">
    <div className="svc-chat">
      <div className="svc-chat__bar">
        <span className="svc-dot svc-dot--live" />
        Company assistant
      </div>
      <p className="svc-chat__msg svc-chat__msg--user">Can a customer return an item after 30 days?</p>
      <div className="svc-chat__msg svc-chat__msg--ai">
        <span className="svc-chat__typing">
          <i />
          <i />
          <i />
        </span>
        <span className="svc-chat__answer">
          Only for store credit — unless the item is faulty. Faulty items can be returned within 12 months.
        </span>
        <span className="svc-chat__source">
          <FiFileText /> Returns policy · section 4
        </span>
      </div>
    </div>
  </Frame>
);

const SOURCES = ['Shopify order', 'Email', 'WhatsApp'];
const ACTIONS = ['CRM updated', 'Calendar booked', 'Team notified'];

export const AutomationVisual = () => (
  <Frame className="svc-visual--automation" caption="Example: tools connected through one automation layer">
    <div className="svc-bus">
      <ul className="svc-bus__side svc-bus__side--in">
        {SOURCES.map((s, i) => (
          <li key={s} style={{ '--d': i }}>{s}</li>
        ))}
      </ul>
      <div className="svc-bus__hub">
        <span className="svc-bus__hub-title">Automation + AI</span>
        <span>reads</span>
        <span>decides</span>
        <span>acts</span>
      </div>
      <ul className="svc-bus__side svc-bus__side--out">
        {ACTIONS.map((s, i) => (
          <li key={s} style={{ '--d': i }}>
            <FiCheck /> {s}
          </li>
        ))}
      </ul>
    </div>
  </Frame>
);

export const WebVisual = () => (
  <Frame className="svc-visual--web" caption="What a converting page gets right: a clear offer, proof, one next step">
    <div className="svc-browser">
      <div className="svc-browser__bar">
        <span /><span /><span />
        <em>yourbusiness.com</em>
      </div>
      <div className="svc-browser__page">
        <div className="svc-wire svc-wire--nav"><i /><i /><i /></div>
        <div className="svc-wire svc-wire--hero">
          <b className="svc-pin">1</b>
          <i className="svc-wire__h" />
          <i className="svc-wire__p" />
          <span className="svc-wire__btn">
            Book a visit
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
      <li><b>1</b> Clear offer</li>
      <li><b>2</b> Proof</li>
      <li><b>3</b> One obvious next step</li>
    </ol>
  </Frame>
);

const ROWS = [
  { name: 'Order', status: 'New', tone: 'new' },
  { name: 'Booking', status: 'In progress', tone: 'progress' },
  { name: 'Delivery', status: 'Done', tone: 'done' },
  { name: 'Invoice', status: 'Done', tone: 'done' },
];

export const WebAppVisual = () => (
  <Frame className="svc-visual--webapp" caption="Example: one dashboard for the work that lives in spreadsheets today">
    <div className="svc-dash">
      <nav className="svc-dash__side">
        <span className="svc-dash__logo" />
        <FiGrid /><FiBox /><FiCalendar /><FiUsers /><FiSettings />
      </nav>
      <div className="svc-dash__main">
        <div className="svc-dash__top"><i /><span className="svc-dash__avatar" /></div>
        <div className="svc-dash__tiles">
          {['Orders', 'Bookings', 'Low stock'].map((t) => (
            <div key={t} className="svc-dash__tile">
              <span>{t}</span>
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
          {ROWS.map((r) => (
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

export const MobileVisual = () => (
  <Frame className="svc-visual--mobile" caption="Example: a booking app connected to the business calendar">
    <div className="svc-phone">
      <div className="svc-phone__notch" />
      <div className="svc-phone__screen">
        <div className="svc-phone__toast">
          <FiBell /> Reminder: your visit is tomorrow at 11:00
        </div>
        <p className="svc-phone__title">My bookings</p>
        {[['Tue', '09:30', 'Consultation'], ['Wed', '11:00', 'Follow-up'], ['Fri', '14:15', 'Check-in']].map(
          ([day, time, label]) => (
            <div key={time} className="svc-phone__card">
              <span className="svc-phone__day">{day}</span>
              <span>
                <strong>{time}</strong>
                <em>{label}</em>
              </span>
            </div>
          )
        )}
        <span className="svc-phone__btn">Book again</span>
      </div>
    </div>
  </Frame>
);

export const VISUALS = {
  ai: AiVisual,
  automation: AutomationVisual,
  web: WebVisual,
  webapp: WebAppVisual,
  mobile: MobileVisual,
};
