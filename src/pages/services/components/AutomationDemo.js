import React, { useEffect, useRef, useState } from 'react';
import { FiUser, FiClock, FiZap, FiCpu, FiUsers } from 'react-icons/fi';
import useReducedMotion from '../../../hooks/useReducedMotion';
import { useServicesText } from '../i18n';
import SectionHeading from './SectionHeading';

const WHO_ICON = { auto: FiZap, ai: FiCpu, team: FiUsers };
const STEP_MS = 850;

// Before/after comparison of one workflow. The "after" lane plays through its steps once
// whenever it comes into view or the scenario changes (instantly with reduced motion).
// Steps run top to bottom, so the flow reads the same in LTR and RTL.
const AutomationDemo = () => {
  const { t, locale } = useServicesText();
  const demo = t.demo;
  const { scenarios } = demo;
  const [active, setActive] = useState(0);
  const [played, setPlayed] = useState(0);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const laneRef = useRef(null);
  const tabRefs = useRef([]);
  const scenario = scenarios[active];
  const rtl = locale !== 'en';

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.35 });
    io.observe(laneRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const total = scenario.after.length;
    if (reduced) {
      setPlayed(total);
      return undefined;
    }
    if (!inView) return undefined;
    setPlayed(0);
    let n = 0;
    const timer = setInterval(() => {
      n += 1;
      setPlayed(n);
      if (n >= total) clearInterval(timer);
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [active, inView, reduced, scenario.after.length]);

  // Arrow keys follow the visual order of the tabs, which is mirrored in RTL.
  const onTabKey = (e) => {
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl ? 'ArrowRight' : 'ArrowLeft';
    const dir = { [forward]: 1, ArrowDown: 1, [back]: -1, ArrowUp: -1 }[e.key];
    let next = null;
    if (dir) next = (active + dir + scenarios.length) % scenarios.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = scenarios.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="automation-demo" className="svc-section svc-band" aria-labelledby="demo-title">
      <div className="svc-wrap">
        <SectionHeading id="demo-title" eyebrow={demo.eyebrow} title={demo.title} intro={demo.intro} />

        <div className="svc-tabs" role="tablist" aria-label={demo.tabsLabel} data-reveal>
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => (tabRefs.current[i] = el)}
              id={`demo-tab-${s.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="demo-panel"
              tabIndex={i === active ? 0 : -1}
              className="svc-tab"
              onClick={() => setActive(i)}
              onKeyDown={onTabKey}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          id="demo-panel"
          role="tabpanel"
          aria-labelledby={`demo-tab-${scenario.id}`}
          className="svc-demo"
          ref={laneRef}
          data-reveal
        >
          <div className="svc-lane svc-lane--before">
            <h3 className="svc-lane__title">
              <span className="svc-lane__tag">{demo.beforeTag}</span> {demo.beforeTitle}
            </h3>
            <ol className="svc-lane__steps">
              {scenario.before.map((text, i) => (
                <li key={text} className="svc-step svc-step--manual">
                  <span className="svc-step__icon" aria-hidden="true"><FiUser /></span>
                  <span className="svc-step__text">{text}</span>
                  {i < scenario.before.length - 1 && (
                    <span className="svc-step__wait"><FiClock aria-hidden="true" /> {demo.wait}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="svc-lane svc-lane--after">
            <h3 className="svc-lane__title">
              <span className="svc-lane__tag svc-lane__tag--on">{demo.afterTag}</span> {demo.afterTitle}
            </h3>
            <ol className="svc-lane__steps">
              {scenario.after.map((step, i) => {
                const Icon = WHO_ICON[step.who];
                return (
                  <li
                    key={step.text}
                    className={`svc-step svc-step--${step.who} ${i < played ? 'is-done' : ''} ${i === played - 1 ? 'is-current' : ''}`}
                  >
                    <span className="svc-step__icon" aria-hidden="true"><Icon /></span>
                    <span className="svc-step__text">{step.text}</span>
                    <span className="svc-step__who">{demo.who[step.who]}</span>
                  </li>
                );
              })}
            </ol>
            <p className="svc-lane__summary">{demo.summary}</p>
          </div>
        </div>
        <p className="svc-note">{demo.note}</p>
      </div>
    </section>
  );
};

export default AutomationDemo;
