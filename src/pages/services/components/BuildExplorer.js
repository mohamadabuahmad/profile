import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { explorer } from '../content';

// "What can I build?" — plain-language ideas for visitors who don't know the technical name
// of what they need. Each one pre-fills the lead form.
const BuildExplorer = ({ onRequest }) => {
  const [filter, setFilter] = useState('all');
  const items = filter === 'all' ? explorer.items : explorer.items.filter((i) => i.need === filter);

  return (
    <>
      <div className="svc-filters" role="group" aria-label="Filter ideas by type" data-reveal>
        {explorer.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="svc-filter"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="svc-sr" aria-live="polite">
        {items.length} {items.length === 1 ? 'idea' : 'ideas'} shown
      </p>

      <ul className="svc-ideas">
        {items.map((item) => (
          <li key={item.name} className="svc-idea">
            <h3 className="svc-idea__name">{item.name}</h3>
            <p className="svc-idea__text">{item.text}</p>
            <a
              href="#start"
              className="svc-idea__link"
              onClick={(e) =>
                onRequest(e, { need: item.need, note: `I'm interested in: ${item.name}.`, source: `idea_${item.name}` })
              }
            >
              Talk about this <FiArrowRight aria-hidden="true" />
              <span className="svc-sr"> — {item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BuildExplorer;
