import React from 'react';
import { FiClock, FiCloud, FiMessageCircle } from 'react-icons/fi';

// The automation project has no interface to screenshot, so it gets a small diagram of
// what the service actually does on a schedule.
const AutomationGraphic = ({ steps = [] }) => (
  <div className="ds-auto-graphic" aria-hidden="true">
    <div className="ds-auto-graphic__row"><FiClock /> <span>{steps[0]}</span></div>
    <div className="ds-auto-graphic__row"><FiCloud /> <span>{steps[1]}</span></div>
    <div className="ds-auto-graphic__row"><FiMessageCircle /> <span>{steps[2]}</span></div>
    <div className="ds-auto-graphic__bubble">
      <i /><i /><i />
    </div>
  </div>
);

export default AutomationGraphic;
