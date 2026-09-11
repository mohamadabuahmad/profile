import React, { useEffect, useRef, useState } from 'react';
import { FiUser, FiClock, FiZap, FiCpu, FiUsers } from 'react-icons/fi';
import useReducedMotion from '../../../hooks/useReducedMotion';
import { automationDemo } from '../content';
import SectionHeading from './SectionHeading';

const WHO = {
  auto: { label: 'Automatic', Icon: FiZap },
  ai: { label: 'AI', Icon: FiCpu },
  team: { label: 'Your team', Icon: FiUsers },
};

const STEP_MS = 900;

// Before/after comparison of one workflow. The "after" lane plays through its steps once
// whenever it comes into view or the scenario changes (instantly with reduced motion).
const AutomationDemo = () => {
  const { scenarios } = automationDemo;
  const [active, setActive] = useState(0);
  const [played, setPlayed] = useState(0); // number of "after" steps lit up
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const laneRef = useRef(null);
  const tabRefs = useRef([]);
  const scenario = scenarios[active];

  useEffect(() => {
    const el = laneRef.current;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.35 });
    io.observe(el);
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

  const onTabKey = (e) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
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
        <SectionHeading id="demo-title" eyebrow={automationDemo.eyebrow} title={automationDemo.title} intro={automationDemo.intro} />

        <div className="svc-tabs" role="tablist" aria-label="Example workflows" data-reveal>
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
              <span className="svc-lane__tag">Today</span> Done by hand
            </h3>
            <ol className="svc-lane__steps">
              {scenario.before.map((text, i) => (
                <li key={text} className="svc-step svc-step--manual">
                  <span className="svc-step__icon" aria-hidden="true"><FiUser /></span>
                  <span className="svc-step__text">{text}</span>
                  {i < scenario.before.length - 1 && (
                    <span className="svc-step__wait"><FiClock aria-hidden="true" /> waits for someone</span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="svc-lane svc-lane--after">
            <h3 className="svc-lane__title">
              <span className="svc-lane__tag svc-lane__tag--on">Automated</span> Handled by the system
            </h3>
            <ol className="svc-lane__steps">
              {scenario.after.map((step, i) => {
                const { label, Icon } = WHO[step.who];
                return (
                  <li
                    key={step.text}
                    className={`svc-step svc-step--${step.who} ${i < played ? 'is-done' : ''} ${i === played - 1 ? 'is-current' : ''}`}
                  >
                    <span className="svc-step__icon" aria-hidden="true"><Icon /></span>
                    <span className="svc-step__text">{step.text}</span>
                    <span className="svc-step__who">{label}</span>
                  </li>
                );
              })}
            </ol>
            <p className="svc-lane__summary">{automationDemo.summary}</p>
          </div>
        </div>
        <p className="svc-note">{automationDemo.note}</p>
      </div>
    </section>
  );
};

export default AutomationDemo;
