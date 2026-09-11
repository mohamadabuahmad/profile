import React from 'react';
import useReducedMotion from '../../../hooks/useReducedMotion';
import { systemMap } from '../content';

const W = 520;
const H = 480;
const CX = W / 2;
const CY = H / 2;

const pathTo = ({ x, y }) => {
  const mx = (CX + x) / 2;
  return `M${CX},${CY} C${mx},${CY} ${mx},${y} ${x},${y}`;
};

// Hero visual: the business in the middle, the systems it can be connected to around it,
// with small data pulses travelling along the connections.
const SystemMap = () => {
  const reduced = useReducedMotion();
  const { center, nodes } = systemMap;

  return (
    <figure className="svc-map" aria-label="Diagram: your business connected to AI, automation, integrations, websites, web platforms and mobile apps">
      <svg className="svc-map__lines" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <circle className="svc-map__orbit" cx={CX} cy={CY} r="150" />
        {nodes.map((n) => (
          <path key={n.id} className="svc-map__line" d={pathTo(n)} />
        ))}
        {!reduced &&
          nodes.map((n, i) => (
            <circle key={`p-${n.id}`} className="svc-map__pulse" r="3.5">
              <animateMotion
                dur="3.6s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
                path={pathTo(n)}
                keyPoints={i % 2 ? '1;0' : '0;1'}
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          ))}
      </svg>

      <div className="svc-map__center" style={{ left: '50%', top: '50%' }}>
        <span className="svc-map__mark" aria-hidden="true">M</span>
        <strong>{center.title}</strong>
        <span className="svc-map__sub">{center.sub}</span>
      </div>

      <ul className="svc-map__nodes">
        {nodes.map((n, i) => (
          <li
            key={n.id}
            className="svc-map__node"
            style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%`, '--d': i }}
          >
            <strong>{n.title}</strong>
            <span className="svc-map__sub">{n.sub}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
};

export default SystemMap;
