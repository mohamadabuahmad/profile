import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOCALES, LOCALE_ORDER, pageFromPath } from '../i18n/locales';
import { trackEvent } from '../analytics';
import { useSite } from '../app/SiteContext';

// Keeps the visitor on the same page when they change language: /work → /ar/work.
// Unknown paths (404) fall back to that language's home page.
const LanguageSwitcher = ({ variant = 'inline', onNavigate }) => {
  const { locale, t, path } = useSite();
  const { pathname } = useLocation();
  const page = pageFromPath(pathname) || 'home';

  // Only the header switcher is a navigation landmark; the footer and mobile-menu copies are
  // labelled groups, so screen-reader users don't get three identical "Language" landmarks.
  const Tag = variant === 'nav' ? 'nav' : 'div';
  const landmarkProps = variant === 'nav' ? { 'aria-label': t.nav.language } : { role: 'group', 'aria-label': t.nav.language };

  return (
    <Tag className={`ds-lang ds-lang--${variant}`} {...landmarkProps}>
      {LOCALE_ORDER.map((code) => (
        <Link
          key={code}
          to={path(page, code)}
          lang={code}
          hrefLang={code}
          aria-current={code === locale ? 'true' : undefined}
          onClick={() => {
            if (code !== locale) trackEvent('Site', 'language_switch', `${locale}->${code}:${page}`);
            if (onNavigate) onNavigate();
          }}
        >
          {LOCALES[code].name}
        </Link>
      ))}
    </Tag>
  );
};

export default LanguageSwitcher;
