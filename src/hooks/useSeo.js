import { useEffect } from 'react';

// Sets page-level <title>, description, canonical, hreflang alternates and social tags while a
// page is mounted, and restores the site defaults from index.html when the visitor navigates away.
// Crawlers that don't run JavaScript get the same tags from the prerendered HTML (scripts/prerender-seo.js).
const META = [
  ['name', 'description', 'description'],
  ['property', 'og:title', 'title'],
  ['property', 'og:description', 'description'],
  ['property', 'og:url', 'url'],
  ['property', 'og:image', 'image'],
  ['property', 'og:locale', 'locale'],
  ['name', 'twitter:title', 'title'],
  ['name', 'twitter:description', 'description'],
  ['name', 'twitter:image', 'image'],
];

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector);
  const created = !el;
  if (created) {
    el = create();
    document.head.appendChild(el);
  }
  return { el, created };
};

export default function useSeo({ title, description, url, image, locale, alternates = [] }) {
  const alternatesKey = alternates.map((a) => `${a.hrefLang}=${a.href}`).join('|');

  useEffect(() => {
    const values = { title, description, url, image, locale };
    const restore = [];

    const prevTitle = document.title;
    document.title = title;
    restore.push(() => { document.title = prevTitle; });

    META.forEach(([attr, key, field]) => {
      if (!values[field]) return;
      const { el, created } = upsert(`meta[${attr}="${key}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute(attr, key);
        return m;
      });
      const prev = el.getAttribute('content');
      el.setAttribute('content', values[field]);
      restore.push(() => (created ? el.remove() : el.setAttribute('content', prev)));
    });

    const { el: canonical, created } = upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    });
    const prevHref = canonical.getAttribute('href');
    canonical.setAttribute('href', url);
    restore.push(() => (created ? canonical.remove() : canonical.setAttribute('href', prevHref)));

    const links = alternatesKey
      ? alternatesKey.split('|').map((pair) => {
          const [hrefLang, href] = pair.split('=');
          const l = document.createElement('link');
          l.rel = 'alternate';
          l.hreflang = hrefLang;
          l.href = href;
          l.dataset.seo = 'alternate';
          document.head.appendChild(l);
          return l;
        })
      : [];
    restore.push(() => links.forEach((l) => l.remove()));

    return () => restore.reverse().forEach((fn) => fn());
  }, [title, description, url, image, locale, alternatesKey]);
}
