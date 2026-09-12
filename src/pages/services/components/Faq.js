import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { useServicesText } from '../i18n';

// Native <details> accordion: keyboard and screen-reader support for free, works without JS.
const Faq = () => {
  const { t } = useServicesText();
  return (
    <div className="ds-faq">
      {t.faq.items.map((item) => (
        <details key={item.q} className="ds-faq__item">
          <summary className="ds-faq__q">
            <h3>{item.q}</h3>
            <FiPlus className="ds-faq__icon" aria-hidden="true" />
          </summary>
          <p className="ds-faq__a">{item.a}</p>
        </details>
      ))}
    </div>
  );
};

export default Faq;
