import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { useServicesText } from '../i18n';

// Native <details> accordion: keyboard and screen-reader support for free, works without JS.
const Faq = () => {
  const { t } = useServicesText();
  return (
    <div className="svc-faq">
      {t.faq.items.map((item) => (
        <details key={item.q} className="svc-faq__item">
          <summary className="svc-faq__q">
            <h3>{item.q}</h3>
            <FiPlus className="svc-faq__icon" aria-hidden="true" />
          </summary>
          <p className="svc-faq__a">{item.a}</p>
        </details>
      ))}
    </div>
  );
};

export default Faq;
