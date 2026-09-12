import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageShell from './components/PageShell';
import { LOCALES, LOCALE_ORDER, PAGES, pathFor } from './i18n/locales';
import { Mark } from './components/brand/Logo';

// Each page and each language is its own chunk: a visitor downloads one page in one language.
const PAGE_LOADERS = {
  home: () => import(/* webpackChunkName: "page-home" */ './pages/Home'),
  services: () => import(/* webpackChunkName: "page-services" */ './pages/services/ServicesPage'),
  work: () => import(/* webpackChunkName: "page-work" */ './pages/Work'),
  about: () => import(/* webpackChunkName: "page-about" */ './pages/About'),
  contact: () => import(/* webpackChunkName: "page-contact" */ './pages/Contact'),
  notfound: () => import(/* webpackChunkName: "page-notfound" */ './pages/NotFound'),
};

const SITE_CONTENT = {
  en: () => import(/* webpackChunkName: "content-en" */ './content/en.json'),
  ar: () => import(/* webpackChunkName: "content-ar" */ './content/ar.json'),
  he: () => import(/* webpackChunkName: "content-he" */ './content/he.json'),
};

// The services page carries a much larger copy bundle of its own.
const SERVICES_CONTENT = {
  en: () => import(/* webpackChunkName: "services-en" */ './pages/services/locales/en.json'),
  ar: () => import(/* webpackChunkName: "services-ar" */ './pages/services/locales/ar.json'),
  he: () => import(/* webpackChunkName: "services-he" */ './pages/services/locales/he.json'),
};

const cache = new Map();

const routeFor = (page, locale) => {
  const key = `${page}:${locale}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      lazy(async () => {
        const [pageModule, siteModule, servicesModule] = await Promise.all([
          PAGE_LOADERS[page](),
          SITE_CONTENT[locale](),
          page === 'services' ? SERVICES_CONTENT[locale]() : Promise.resolve(null),
        ]);
        const Page = pageModule.default;
        const site = siteModule.default;
        const services = servicesModule?.default;
        const seo =
          page === 'services'
            ? { title: services.meta.title, description: services.meta.description, image: services.meta.ogImage }
            : { ...site.meta[page], robots: page === 'notfound' ? 'noindex, follow' : undefined, noAlternates: page === 'notfound' };

        const Composed = () => (
          <PageShell locale={locale} page={page === 'notfound' ? 'home' : page} site={site} seo={seo}>
            {page === 'services' ? (
              <Page locale={locale} content={services} />
            ) : (
              <Page work={site.work} />
            )}
          </PageShell>
        );
        return { default: Composed };
      })
    );
  }
  return React.createElement(cache.get(key));
};

// Page transitions are a brand moment too: the mark, then a hairline that travels.
const Fallback = () => (
  <div className="ds">
    <div className="ds-loading" role="status" aria-live="polite">
      <Mark size={28} className="ds-loading__mark" />
      <span className="ds-loading__bar" />
    </div>
  </div>
);

const AppRouter = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Suspense fallback={<Fallback />}>
      <Routes>
        {LOCALE_ORDER.map((locale) => (
          <React.Fragment key={locale}>
            {Object.keys(PAGES).map((page) => (
              <Route key={page} path={pathFor(page, locale)} element={routeFor(page, locale)} />
            ))}
            {/* Anything else under /ar or /he is a 404 in that language. */}
            {LOCALES[locale].prefix && (
              <Route path={`${LOCALES[locale].prefix}/*`} element={routeFor('notfound', locale)} />
            )}
          </React.Fragment>
        ))}

        {/* Routes from the previous site, kept working. */}
        <Route path="/apps" element={<Navigate to="/work" replace />} />
        <Route path="/my-services" element={<Navigate to="/services" replace />} />

        <Route path="*" element={routeFor('notfound', 'en')} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;
