import React, { useEffect, useMemo, useState } from 'react';
import { MARK_PATH } from './Logo';
import useReducedMotion from '../../hooks/useReducedMotion';

// The mark's polygon, in the same 100-unit field as MARK_PATH.
const MARK_POLYGON = [
  [0, 0], [100, 0], [100, 100], [70, 100], [70, 24], [50, 64], [30, 24], [30, 100], [0, 100],
];

const isInsideMark = (x, y) => {
  let inside = false;
  for (let i = 0, j = MARK_POLYGON.length - 1; i < MARK_POLYGON.length; j = i, i += 1) {
    const [xi, yi] = MARK_POLYGON[i];
    const [xj, yj] = MARK_POLYGON[j];
    const straddles = (yi > y) !== (yj > y);
    if (straddles && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

const GRID = 16; // 16 x 16 cells over the field — 256 nodes, cheap to animate
const CELL = 100 / GRID;

// The brand idea, made literal: the field starts as one complete square — the whole
// problem, undifferentiated — and everything unnecessary is removed until what is
// left is the M. Subtraction, not construction.
const buildCells = (broken = false) => {
  const cells = [];
  for (let row = 0; row < GRID; row += 1) {
    for (let col = 0; col < GRID; col += 1) {
      const x = col * CELL;
      const y = row * CELL;
      let keep = isInsideMark(x + CELL / 2, y + CELL / 2);
      // The 404 variant is the same system left unresolved: a few cells never
      // left, a few that belong are missing. Deterministic, so prerender matches.
      if (broken) {
        // Sparse enough that the M still reads: a few cells missing from the
        // form, a little debris left outside it. Too much noise and it stops
        // looking like an unresolved mark and starts looking like a broken file.
        if (keep && (row * 7 + col * 13) % 17 === 0) keep = false;
        else if (!keep && (row * 5 + col * 3) % 29 === 0) keep = true;
      }
      // Cells leave from the outside in, so the form emerges rather than appears.
      const distance = Math.max(Math.abs(col - (GRID - 1) / 2), Math.abs(row - (GRID - 1) / 2));
      cells.push({ x, y, keep, delay: ((GRID / 2 - distance) / (GRID / 2)) * 460 });
    }
  }
  return cells;
};

// Long enough for the slowest cell to finish and hand over to the solid path.
const RESOLVE_MS = 1400;

const BrandResolve = ({ className = '', variant = 'mark' }) => {
  const reduced = useReducedMotion();
  const broken = variant === 'broken';
  const cells = useMemo(() => buildCells(broken), [broken]);
  const [resolved, setResolved] = useState(false);

  // Once the moment is over the cells have no job left. Dropping them leaves a
  // single crisp <path> as the finished mark, and takes 256 nodes out of the DOM.
  useEffect(() => {
    if (reduced || broken) return undefined;
    const timer = setTimeout(() => setResolved(true), RESOLVE_MS);
    return () => clearTimeout(timer);
  }, [reduced, broken]);

  // With reduced motion, or once resolved, the brand moment is simply the mark.
  if ((reduced || resolved) && !broken) {
    return (
      <svg className={`ds-resolve ${className}`.trim()} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path d={MARK_PATH} fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      className={`ds-resolve ${reduced || broken ? '' : 'is-running'} ${className}`.trim()}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      {/* The finished mark sits underneath, so the cells that stay leave no seams
          between them once they have settled. The broken variant has no solid
          floor — that is the point: it never resolved. */}
      {broken ? null : <path className="ds-resolve__solid" d={MARK_PATH} fill="currentColor" />}
      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          className={cell.keep ? 'ds-resolve__cell is-kept' : 'ds-resolve__cell'}
          x={cell.x}
          y={cell.y}
          width={CELL + 0.4} /* hairline overlap so the resolved mark has no seams */
          height={CELL + 0.4}
          style={{ '--cell-delay': `${Math.round(cell.delay)}ms` }}
        />
      ))}
    </svg>
  );
};

export default BrandResolve;
