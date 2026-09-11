/* Runs after `npm run build` (npm "postbuild").
 *
 * The site is a client-side React app, so every URL is served the same index.html.
 * Search engines and link previews (WhatsApp, LinkedIn, Facebook) that don't run
 * JavaScript would only ever see the generic homepage tags. For each language of the
 * services page this writes <path>/index.html: the same app shell, with that language's
 * <html lang/dir>, title, description, canonical, hreflang alternates, social tags,
 * JSON-LD, web font and chunk preloads baked into <head>.
 * Static hosts (Vercel, GitHub Pages) serve these files before any SPA fallback.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const build = path.join(root, 'build');
const site = require(path.join(root, 'src/pages/services/site.js'));

// Mirrors src/i18n/locales.js (kept separate because that file is an ES module).
const LOCALES = {
  en: { dir: 'ltr', servicesPath: '/services' },
  ar: { dir: 'rtl', servicesPath: '/ar/services' },
  he: { dir: 'rtl', servicesPath: '/he/services' },
};
const ORDER = ['en', 'ar', 'he'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const shell = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const manifest = require(path.join(build, 'asset-manifest.json')).files;
const publicUrl = process.env.PUBLIC_URL || '';

const jsonLd = (locale, t, url, image) => {
  const person = `${site.siteUrl}/#mohamad`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': person,
        name: 'Mohamad Abu Ahmad',
        brand: { '@type': 'Brand', name: 'Mohamad Dev' },
        jobTitle: 'Software Engineer',
        url: site.siteUrl,
        email: `mailto:${site.email}`,
        sameAs: ['https://www.linkedin.com/in/mohamad-abu-ahmad-817a82262/', 'https://github.com/mohamadabuahmad'],
      },
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: locale,
        primaryImageOfPage: image,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Mohamad Dev', item: `${site.siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: t.solutionsIntro.eyebrow, item: url },
          ],
        },
      },
      ...t.solutions.map((s) => ({
        '@type': 'Service',
        name: s.label,
        serviceType: s.label,
        description: s.body,
        provider: { '@id': person },
        availableLanguage: ORDER,
        url: `${url}#solution-${s.id}`,
      })),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: locale,
        mainEntity: t.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
};

const render = (locale) => {
  const t = require(path.join(root, `src/pages/services/locales/${locale}.json`));
  const { dir, servicesPath } = LOCALES[locale];
  const url = `${site.siteUrl}${servicesPath}`;
  const image = `${site.siteUrl}${t.meta.ogImage}`;
  let html = shell;

  const replace = (pattern, value, label) => {
    if (!pattern.test(html)) throw new Error(`prerender-seo: could not find ${label} in build/index.html`);
    html = html.replace(pattern, (_, start, end) => `${start}${esc(value)}${end}`);
  };

  if (!/<html lang="en">/.test(html)) throw new Error('prerender-seo: could not find <html lang="en">');
  html = html.replace('<html lang="en">', `<html lang="${locale}" dir="${dir}">`);
  replace(/(<title>)[^<]*(<\/title>)/, t.meta.title, '<title>');
  replace(/(<meta name="description" content=")[^"]*(")/, t.meta.description, 'meta description');
  replace(/(<meta property="og:title" content=")[^"]*(")/, t.meta.title, 'og:title');
  replace(/(<meta property="og:description" content=")[^"]*(")/, t.meta.description, 'og:description');
  replace(/(<meta property="og:url" content=")[^"]*(")/, url, 'og:url');
  replace(/(<meta property="og:image" content=")[^"]*(")/, image, 'og:image');
  replace(/(<meta name="twitter:title" content=")[^"]*(")/, t.meta.title, 'twitter:title');
  replace(/(<meta name="twitter:description" content=")[^"]*(")/, t.meta.description, 'twitter:description');
  replace(/(<meta name="twitter:image" content=")[^"]*(")/, image, 'twitter:image');

  // Page code + this language's copy are lazy chunks; preload them so they download in
  // parallel with the main bundle instead of after it.
  const chunks = ['services.js', 'services.css', `services-${locale}.js`].filter((k) => manifest[k]);
  if (chunks.length < 3) console.warn(`prerender-seo: missing chunks for ${locale}: ${chunks.join(', ')}`);

  const others = ORDER.filter((l) => l !== locale).map((l) => require(path.join(root, `src/pages/services/locales/${l}.json`)).meta.ogLocale);
  const head = [
    ...chunks.map((k) => `<link rel="preload" as="${k.endsWith('.css') ? 'style' : 'script'}" href="${manifest[k]}"/>`),
    site.fonts[locale] &&
      `<link rel="stylesheet" href="${site.fonts[locale]}" media="print" onload="this.media='all'"/>`,
    `<link rel="canonical" href="${esc(url)}"/>`,
    ...ORDER.map((l) => `<link rel="alternate" hreflang="${l}" href="${site.siteUrl}${LOCALES[l].servicesPath}"/>`),
    `<link rel="alternate" hreflang="x-default" href="${site.siteUrl}${LOCALES.en.servicesPath}"/>`,
    `<meta property="og:locale" content="${t.meta.ogLocale}"/>`,
    ...others.map((l) => `<meta property="og:locale:alternate" content="${l}"/>`),
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:image:alt" content="${esc(t.meta.ogImageAlt)}"/>`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(locale, t, url, image)).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean);
  html = html.replace('</head>', `${head.join('')}</head>`);

  const outDir = path.join(build, servicesPath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`prerender-seo: wrote build${servicesPath}/index.html${publicUrl ? ` (PUBLIC_URL=${publicUrl})` : ''}`);
};

ORDER.forEach(render);
