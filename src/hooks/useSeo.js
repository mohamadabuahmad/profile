import { useEffect } from 'react';

// Sets page-level <title>, description, canonical and social tags while a page is mounted,
// and restores the site defaults from index.html when the visitor navigates away.
// Crawlers that don't run JavaScript get the same tags from the prerendered HTML (scripts/prerender-seo.js).
const META = [
  ['name', 'description', 'description'],
  ['property', 'og:title', 'title'],
  ['property', 'og:description', 'description'],
  ['property', 'og:url', 'url'],
  ['property', 'og:image', 'image'],
  ['name', 'twitter:title', 'title'],
  ['name', 'twitter:description', 'description'],
  ['name', 'twitter:image', 'image'],
];

export default function useSeo({ title, description, url, image }) {
  useEffect(() => {
    const values = { title, description, url, image };
    const restore = [];

    const prevTitle = document.title;
    document.title = title;
    restore.push(() => { document.title = prevTitle; });

    META.forEach(([attr, key, field]) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      const created = !el;
      if (created) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute('content');
      el.setAttribute('content', values[field]);
      restore.push(() => (created ? el.remove() : el.setAttribute('content', prev)));
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (createdCanonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const prevHref = canonical.getAttribute('href');
    canonical.setAttribute('href', url);
    restore.push(() => (createdCanonical ? canonical.remove() : canonical.setAttribute('href', prevHref)));

    return () => restore.reverse().forEach((fn) => fn());
  }, [title, description, url, image]);
}
