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
      <div className="ds-filters" role="group" aria-label={ex.filtersLabel} data-reveal>
        {FILTERS.map((id) => (
          <button key={id} type="button" className="ds-filter" aria-pressed={filter === id} onClick={() => setFilter(id)}>
            {ex.filters[id]}
          </button>
        ))}
      </div>

      <p className="ds-sr" aria-live="polite">{plural(ex.shown, items.length, locale)}</p>

      <ul className="ds-ideas">
        {items.map((item) => (
          <li key={item.name} className="ds-idea">
            <h3 className="ds-idea__name">{item.name}</h3>
            <p className="ds-idea__text">{item.text}</p>
            <a
              href="#start"
              className="ds-idea__link"
              onClick={(e) =>
                onRequest(e, { need: item.need, note: ex.interested.replace('{name}', item.name), source: `idea_${item.need}` })
              }
            >
              {ex.talk} <FiArrowRight className="ds-arrow" aria-hidden="true" />
              <span className="ds-sr"> — {item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BuildExplorer;
