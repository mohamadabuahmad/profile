/* Runs after `npm run build` (npm "postbuild").
 *
 * The site is a client-side React app, so every URL is served the same index.html.
 * Search engines and link previews (WhatsApp, LinkedIn, Facebook) that don't run
 * JavaScript would only ever see the generic homepage tags. This writes
 * build/services/index.html: the same app shell, with the /services title,
 * description, canonical URL, social tags and JSON-LD baked into <head>.
 * Static hosts (Vercel, GitHub Pages) serve it for /services before any SPA fallback.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const build = path.join(root, 'build');
const seo = require(path.join(root, 'src/pages/services/seo.json'));
const faq = require(path.join(root, 'src/pages/services/faq.json'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const url = `${seo.siteUrl}${seo.path}`;
const image = `${seo.siteUrl}${seo.ogImage}`;
const person = `${seo.siteUrl}/#mohamad`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': person,
      name: 'Mohamad Abu Ahmad',
      brand: { '@type': 'Brand', name: 'Mohamad Dev' },
      jobTitle: 'Software Engineer',
      url: seo.siteUrl,
      email: 'mailto:mohamdadm25@gmail.com',
      sameAs: ['https://www.linkedin.com/in/mohamad-abu-ahmad-817a82262/', 'https://github.com/mohamadabuahmad'],
    },
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: seo.title,
      description: seo.description,
      primaryImageOfPage: image,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${seo.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: url },
        ],
      },
    },
    ...seo.services.map((s) => ({
      '@type': 'Service',
      name: s.name,
      serviceType: s.name,
      description: s.description,
      provider: { '@id': person },
      url,
    })),
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

let html = fs.readFileSync(path.join(build, 'index.html'), 'utf8');

const replaceTag = (pattern, value, label) => {
  if (!pattern.test(html)) throw new Error(`prerender-seo: could not find ${label} in build/index.html`);
  html = html.replace(pattern, (_, start, end) => `${start}${esc(value)}${end}`);
};

replaceTag(/(<title>)[^<]*(<\/title>)/, seo.title, '<title>');
replaceTag(/(<meta name="description" content=")[^"]*(")/, seo.description, 'meta description');
replaceTag(/(<meta property="og:title" content=")[^"]*(")/, seo.title, 'og:title');
replaceTag(/(<meta property="og:description" content=")[^"]*(")/, seo.description, 'og:description');
replaceTag(/(<meta property="og:url" content=")[^"]*(")/, url, 'og:url');
replaceTag(/(<meta property="og:image" content=")[^"]*(")/, image, 'og:image');
replaceTag(/(<meta name="twitter:title" content=")[^"]*(")/, seo.title, 'twitter:title');
replaceTag(/(<meta name="twitter:description" content=")[^"]*(")/, seo.description, 'twitter:description');
replaceTag(/(<meta name="twitter:image" content=")[^"]*(")/, image, 'twitter:image');

// The page's code is a lazy-loaded chunk; preload it so it downloads in parallel with the main bundle.
const manifest = require(path.join(build, 'asset-manifest.json')).files;
const preloads = [
  manifest['services.js'] && `<link rel="preload" as="script" href="${manifest['services.js']}"/>`,
  manifest['services.css'] && `<link rel="preload" as="style" href="${manifest['services.css']}"/>`,
].filter(Boolean);
if (preloads.length !== 2) console.warn('prerender-seo: services chunk not found in asset-manifest.json, skipping preload');

const extra = [
  ...preloads,
  `<link rel="canonical" href="${esc(url)}"/>`,
  `<meta property="og:image:width" content="1200"/>`,
  `<meta property="og:image:height" content="630"/>`,
  `<meta property="og:image:alt" content="${esc(seo.ogImageAlt)}"/>`,
  `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
].join('');
html = html.replace('</head>', `${extra}</head>`);

fs.mkdirSync(path.join(build, 'services'), { recursive: true });
fs.writeFileSync(path.join(build, 'services', 'index.html'), html);
console.log('prerender-seo: wrote build/services/index.html');
