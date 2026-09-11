import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { plural, useServicesText } from '../i18n';

const FILTERS = ['all', 'ai', 'automation', 'web', 'webapp', 'mobile'];

// "What can I build?" — plain-language ideas for visitors who don't know the technical name
// of what they need. Each one pre-fills the lead form.
const BuildExplorer = ({ onRequest }) => {
  const { t, locale } = useServicesText();
  const ex = t.explorer;
  const [filter, setFilter] = useState('all');
  const items = filter === 'all' ? ex.items : ex.items.filter((i) => i.need === filter);

  return (
    <>
      <div className="svc-filters" role="group" aria-label={ex.filtersLabel} data-reveal>
        {FILTERS.map((id) => (
          <button key={id} type="button" className="svc-filter" aria-pressed={filter === id} onClick={() => setFilter(id)}>
            {ex.filters[id]}
          </button>
        ))}
      </div>

      <p className="svc-sr" aria-live="polite">{plural(ex.shown, items.length, locale)}</p>

      <ul className="svc-ideas">
        {items.map((item) => (
          <li key={item.name} className="svc-idea">
            <h3 className="svc-idea__name">{item.name}</h3>
            <p className="svc-idea__text">{item.text}</p>
            <a
              href="#start"
              className="svc-idea__link"
              onClick={(e) =>
                onRequest(e, { need: item.need, note: ex.interested.replace('{name}', item.name), source: `idea_${item.need}` })
              }
            >
              {ex.talk} <FiArrowRight className="svc-arrow" aria-hidden="true" />
              <span className="svc-sr"> — {item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BuildExplorer;
