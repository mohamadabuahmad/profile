import React from 'react';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import en from '../content/en.json';
import ar from '../content/ar.json';
import he from '../content/he.json';
import servicesEn from '../pages/services/locales/en.json';
import servicesAr from '../pages/services/locales/ar.json';
import servicesHe from '../pages/services/locales/he.json';

jest.mock('emailjs-com', () => ({ __esModule: true, default: { send: jest.fn() } }));

const CONTENT = { en, ar, he };
const SERVICES = { en: servicesEn, ar: servicesAr, he: servicesHe };

// Pages, their copy and the shell's effects (language, metadata) all settle asynchronously.
const visit = async (path, locale = 'en') => {
  window.history.pushState({}, '', path);
  render(<App />);
  const heading = await screen.findByRole('heading', { level: 1 }, { timeout: 5000 });
  await waitFor(() => expect(document.documentElement.lang).toBe(locale));
  return heading;
};

afterEach(() => {
  window.history.pushState({}, '', '/');
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
});

describe('content files', () => {
  const shape = (a, b, path, out) => {
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) out.push(`${path}: length`);
      else a.forEach((x, i) => shape(x, b[i], `${path}[${i}]`, out));
    } else if (a && typeof a === 'object') {
      Object.keys(a).forEach((k) => (k in b ? shape(a[k], b[k], `${path}.${k}`, out) : out.push(`${path}.${k}: missing`)));
    } else if (['id', 'target', 'need', 'who', 'tone', 'href', 'src', 'device'].includes(path.split('.').pop()) && a !== b) {
      out.push(`${path}: ${a} != ${b}`);
    }
    return out;
  };

  test.each(['ar', 'he'])('site content for %s matches the English structure', (locale) => {
    expect(shape(en, CONTENT[locale], locale, [])).toEqual([]);
  });

  test.each(['ar', 'he'])('services content for %s matches the English structure', (locale) => {
    expect(shape(servicesEn, SERVICES[locale], locale, [])).toEqual([]);
  });

  test.each(['ar', 'he'])('%s headings are actually translated', (locale) => {
    const t = CONTENT[locale];
    [t.home.hero.title, t.work.hero.title, t.about.hero.title, t.contact.hero.title].forEach((title) =>
      expect(title).not.toMatch(/\b(the|and|your|business|technology)\b/i)
    );
  });

  test('every work screenshot referenced by the content exists on disk', () => {
    // eslint-disable-next-line global-require
    const fs = require('fs');
    en.work.items.flatMap((item) => item.shots).forEach((shot) => {
      expect(fs.existsSync(`public${shot.src}.webp`)).toBe(true);
      expect(fs.existsSync(`public${shot.src}@2x.webp`)).toBe(true);
    });
  });
});

describe('routing and languages', () => {
  test('the homepage leads with the positioning headline', async () => {
    const heading = await visit('/');
    expect(heading).toHaveTextContent(en.home.hero.title);
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.title).toBe(en.meta.home.title);
  });

  test.each([
    ['/ar', 'ar'],
    ['/he', 'he'],
  ])('%s renders the localized homepage and sets lang/dir', async (path, locale) => {
    const heading = await visit(path, locale);
    expect(heading).toHaveTextContent(CONTENT[locale].home.hero.title);
    expect(document.documentElement.lang).toBe(locale);
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.title).toBe(CONTENT[locale].meta.home.title);
  });

  test.each([
    ['/work', 'en'],
    ['/ar/work', 'ar'],
    ['/he/about', 'he'],
    ['/ar/contact', 'ar'],
    ['/he/services', 'he'],
  ])('%s renders in %s with a canonical URL and three alternates', async (path, locale) => {
    await visit(path, locale);
    // eslint-disable-next-line testing-library/no-node-access
    const canonical = document.head.querySelector('link[rel="canonical"]');
    expect(canonical.getAttribute('href')).toBe(`https://www.mohamaddev.com${path}`);
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(3);
    expect(document.documentElement.lang).toBe(locale);
  });

  test('unknown URLs render a 404 that is not indexed', async () => {
    const heading = await visit('/no-such-page');
    expect(heading).toHaveTextContent(en.notfound.title);
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.head.querySelector('meta[name="robots"]').getAttribute('content')).toBe('noindex, follow');
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(0);
  });

  test('old links keep working: /apps redirects to /work', async () => {
    const heading = await visit('/apps');
    expect(heading).toHaveTextContent(en.work.hero.title);
    expect(window.location.pathname).toBe('/work');
  });

  test('old links keep working: /my-services redirects to /services', async () => {
    await visit('/my-services');
    expect(window.location.pathname).toBe('/services');
  });

  test('the language switcher keeps the visitor on the same page', async () => {
    await visit('/work');
    const nav = screen.getAllByRole('navigation', { name: en.nav.language })[0];
    expect(within(nav).getByRole('link', { name: 'العربية' })).toHaveAttribute('href', '/ar/work');
    expect(within(nav).getByRole('link', { name: 'עברית' })).toHaveAttribute('href', '/he/work');
  });

  test('navigation and footer are localized on Arabic pages', async () => {
    await visit('/ar/about', 'ar');
    expect(screen.getAllByRole('link', { name: ar.nav.links.services })[0]).toHaveAttribute('href', '/ar/services');
    expect(screen.getByText(ar.footer.tagline)).toBeInTheDocument();
  });

  test('the mobile menu opens, traps Escape and closes', async () => {
    await visit('/');
    const toggle = screen.getByRole('button', { name: en.nav.menu });
    fireEvent.click(toggle);
    const menu = screen.getByRole('button', { name: en.nav.close });
    expect(menu).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(await screen.findByRole('button', { name: en.nav.menu })).toBeInTheDocument();
  });
});

describe('services page', () => {
  test('a service CTA pre-selects that service in the lead form', async () => {
    await visit('/services');
    fireEvent.click(screen.getByRole('link', { name: servicesEn.solutions[0].cta }));
    const form = screen.getByRole('form', { name: servicesEn.closing.formTitle });
    expect(within(form).getByLabelText(en.form.needs.ai)).toBeChecked();
  });
});
