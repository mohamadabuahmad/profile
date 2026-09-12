import React from 'react';
import { Mark } from '../../../components/brand/Logo';
import { useServicesText } from '../i18n';

// One square field, one orbit, six spokes. Everything is derived, not eyeballed:
// the nodes sit on the orbit at exact 60° steps, and every spoke is a straight
// line from the centre box's edge to that orbit — same angle step, same length.
const SIZE = 520;
const C = SIZE / 2;
const ORBIT = 134; // every spoke ends here, and every node's inner edge touches it
const BOX_W = 96; // half-width of the centre box, plus its clear space
const BOX_H = 62; // half-height of the centre box, plus its clear space
const NODE_W = 62; // half-width of a node box
const NODE_H = 31; // half-height of a node box

// Order matters: the first node is upper-start, then clockwise.
const IDS = ['ai', 'automation', 'integrations', 'web', 'webapp', 'mobile'];

// Angles are symmetric about both axes, so the diagram is identical mirrored
// and therefore reads the same in Arabic and Hebrew.
const ANGLES = [-120, -60, 0, 60, 120, 180];

const point = (deg, r) => {
  const a = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

// How far a centred rectangle reaches along a given radius — used to start each
// spoke exactly on the centre box's edge and to stop it exactly where the node
// box begins, so no spoke runs short or disappears underneath a box.
const reach = (deg, hw, hh) => {
  const a = (deg * Math.PI) / 180;
  return Math.min(hw / Math.abs(Math.cos(a) || 1e-6), hh / Math.abs(Math.sin(a) || 1e-6));
};

const NODES = IDS.map((id, i) => {
  const deg = ANGLES[i];
  return {
    id,
    deg,
    from: point(deg, reach(deg, BOX_W, BOX_H)),
    to: point(deg, ORBIT),
    // the node sits just outside the orbit, its inner edge on the circle
    at: point(deg, ORBIT + reach(deg, NODE_W, NODE_H)),
  };
});

// Hero visual: the business in the middle, the systems it can be connected to
// around it, with the connections themselves carrying the movement.
const SystemMap = () => {
  const { t } = useServicesText();
  const { label, center, nodes } = t.map;

  return (
    <figure className="ds-map" aria-label={label}>
      <svg className="ds-map__lines" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" focusable="false">
        <circle className="ds-map__orbit" cx={C} cy={C} r={ORBIT} />
        {NODES.map((n) => (
          <g key={n.id}>
            <line className="ds-map__line" x1={n.from.x} y1={n.from.y} x2={n.to.x} y2={n.to.y} />
            <line
              className="ds-map__flow"
              x1={n.from.x}
              y1={n.from.y}
              x2={n.to.x}
              y2={n.to.y}
              style={{ '--d': NODES.indexOf(n) }}
            />
          </g>
        ))}
      </svg>

      <div className="ds-map__center" style={{ left: '50%', top: '50%' }}>
        <Mark size={26} className="ds-map__mark" />
        <strong>{center.title}</strong>
        <span className="ds-map__sub">{center.sub}</span>
      </div>

      <ul className="ds-map__nodes">
        {NODES.map((n, i) => (
          <li
            key={n.id}
            className="ds-map__node"
            style={{ left: `${(n.at.x / SIZE) * 100}%`, top: `${(n.at.y / SIZE) * 100}%`, '--d': i }}
          >
            <strong>{nodes[n.id].title}</strong>
            <span className="ds-map__sub">{nodes[n.id].sub}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
};

export default SystemMap;
