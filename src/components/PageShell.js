import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import useReveal from '../hooks/useReveal';
import { LOCALES, LOCALE_FONTS, LOCALE_ORDER, SITE, pathFor } from '../i18n/locales';
import { SiteProvider } from '../app/SiteContext';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

// Sets the document language and direction for as long as a page is mounted, and loads the
// Arabic/Hebrew web font on those pages only.
const useDocumentLocale = (locale) => {
  useEffect(() => {
    const html = document.documentElement;
    const previous = { lang: html.lang, dir: html.dir };
    html.lang = locale;
    html.dir = LOCALES[locale].dir;

    const href = LOCALE_FONTS[locale];
    if (href && !document.querySelector(`link[data-locale-font="${locale}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.localeFont = locale;
      document.head.appendChild(link);
    }
    return () => {
      html.lang = previous.lang || 'en';
      html.dir = previous.dir || 'ltr';
    };
  }, [locale]);
};

// Every page renders inside this: one place for locale, SEO, chrome and scroll/focus behaviour.
const PageShell = ({ locale = 'en', page, site, seo, children }) => {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const { pathname, hash } = useLocation();
  const value = useMemo(() => ({ locale, page, t: site }), [locale, page, site]);

  useDocumentLocale(locale);
  useReveal(rootRef);
  useSeo({
    title: seo.title,
    description: seo.description,
    url: `${SITE.url}${pathFor(page, locale)}`,
    image: `${SITE.url}${seo.image || '/og-services.png'}`,
    locale: LOCALES[locale].ogLocale,
    robots: seo.robots,
    alternates: seo.noAlternates
      ? []
      : LOCALE_ORDER.map((code) => ({ hrefLang: code, href: `${SITE.url}${pathFor(page, code)}` })),
  });

  // New page: start at the top and put keyboard focus at the start of the content.
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <SiteProvider value={value}>
      <div className="ds" ref={rootRef} lang={locale} dir={LOCALES[locale].dir}>
        <a className="ds-skip" href="#main">{site.nav.skip}</a>
        <SiteNav />
        <main id="main" ref={mainRef} tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </SiteProvider>
  );
};

export default PageShell;
