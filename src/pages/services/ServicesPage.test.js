import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within, waitFor, fireEvent } from '@testing-library/react';
import emailjs from 'emailjs-com';
import ReactGA from 'react-ga4';
import ServicesPage from './ServicesPage';
import { validate, buildEmail } from './components/LeadForm';
import en from './locales/en.json';
import ar from './locales/ar.json';
import he from './locales/he.json';

jest.mock('emailjs-com', () => ({ __esModule: true, default: { send: jest.fn() } }));

const CONTENT = { en, ar, he };
const PATHS = { en: '/services', ar: '/ar/services', he: '/he/services' };

const renderPage = (locale = 'en') =>
  render(
    <MemoryRouter initialEntries={[PATHS[locale]]}>
      <ServicesPage locale={locale} content={CONTENT[locale]} />
    </MemoryRouter>
  );

const form = (t = en) => screen.getByRole('form', { name: t.closing.formTitle });

// <head> and <html> sit outside the rendered tree, so Testing Library queries can't reach them.
/* eslint-disable testing-library/no-node-access */
const head = (selector) => document.head.querySelector(selector);
const alternates = () => [...document.head.querySelectorAll('link[rel="alternate"]')].map((l) => `${l.hreflang} ${l.href}`);
/* eslint-enable testing-library/no-node-access */

// user-event 13 fires through a different @testing-library/dom copy than RTL configures,
// so its events skip act(); RTL's own fireEvent is always act-wrapped.
const type = (el, value) => fireEvent.change(el, { target: { value } });

const fillValidForm = (t = en) => {
  const f = within(form(t));
  type(f.getByLabelText(t.form.name), 'Dana Levi');
  type(f.getByLabelText(t.form.email), 'dana@example.com');
  fireEvent.click(f.getByLabelText(t.form.needs.webapp));
  type(f.getByLabelText(t.form.messageLabel), 'Orders arrive by WhatsApp and we copy them into Excel by hand.');
};

beforeEach(() => {
  emailjs.send.mockReset();
  ReactGA.event.mockClear();
});

describe('locale files', () => {
  // Every language must have the same shape, ids, targets and links as English.
  const shape = (a, b, path, out) => {
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) out.push(`${path}: length`);
      else a.forEach((x, i) => shape(x, b[i], `${path}[${i}]`, out));
    } else if (a && typeof a === 'object') {
      Object.keys(a).forEach((k) => (k in b ? shape(a[k], b[k], `${path}.${k}`, out) : out.push(`${path}.${k}: missing`)));
    } else if (['id', 'target', 'need', 'who', 'tone', 'href'].includes(path.split('.').pop()) && a !== b) {
      out.push(`${path}: ${a} != ${b}`);
    }
    return out;
  };

  test.each(['ar', 'he'])('%s matches the English structure', (locale) => {
    expect(shape(en, CONTENT[locale], locale, [])).toEqual([]);
  });

  test.each(['ar', 'he'])('%s has no English left in its headings', (locale) => {
    const t = CONTENT[locale];
    [t.hero.title, t.problems.title, t.closing.title, ...t.solutions.map((s) => s.title)].forEach((title) =>
      expect(title).not.toMatch(/\b(the|and|your|business)\b/i)
    );
  });
});

describe('Services page (English)', () => {
  test('leads with the business positioning and a single H1', () => {
    renderPage();
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(en.hero.title);
    expect(screen.getByRole('link', { name: /let's build your solution/i })).toHaveAttribute('href', '#start');
    [en.solutions[0].title, en.solutions[1].title, en.faq.title].forEach((name) =>
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    );
  });

  test('sets SEO and hreflang while mounted and restores the site defaults afterwards', () => {
    document.title = 'Default title';
    const { unmount } = renderPage();
    expect(document.title).toBe(en.meta.title);
    expect(head('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.mohamaddev.com/services');
    expect(alternates()).toEqual([
      'en https://www.mohamaddev.com/services',
      'ar https://www.mohamaddev.com/ar/services',
      'he https://www.mohamaddev.com/he/services',
    ]);
    unmount();
    expect(document.title).toBe('Default title');
    expect(head('link[rel="canonical"]')).toBeNull();
    expect(alternates()).toEqual([]);
  });

  test('language switcher links to every version and marks the current one', () => {
    renderPage();
    const nav = screen.getByRole('navigation', { name: en.switcher.label });
    expect(within(nav).getByRole('link', { name: 'English' })).toHaveAttribute('aria-current', 'page');
    expect(within(nav).getByRole('link', { name: 'العربية' })).toHaveAttribute('href', '/ar/services');
    expect(within(nav).getByRole('link', { name: 'עברית' })).toHaveAttribute('href', '/he/services');
  });

  test('a service CTA pre-selects that service in the lead form and is tracked', () => {
    renderPage();
    fireEvent.click(screen.getByRole('link', { name: en.solutions[0].cta }));
    expect(within(form()).getByLabelText(en.form.needs.ai)).toBeChecked();
    expect(within(form()).getByLabelText(en.form.needs.mobile)).not.toBeChecked();
    expect(ReactGA.event).toHaveBeenCalledWith({ category: 'Services', action: 'service_cta_click', label: 'service_ai' });
  });

  test('the ideas explorer filters and pre-fills the problem description', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: en.explorer.filters.mobile }));
    const ideas = screen.getAllByRole('link', { name: new RegExp(en.explorer.talk) });
    expect(ideas).toHaveLength(1);
    fireEvent.click(ideas[0]);
    expect(within(form()).getByLabelText(en.form.needs.mobile)).toBeChecked();
    expect(within(form()).getByLabelText(en.form.messageLabel)).toHaveValue("I'm interested in: Mobile App. ");
  });

  test('automation demo tabs switch scenario with arrow keys', () => {
    renderPage();
    const first = screen.getByRole('tab', { name: en.demo.scenarios[0].label });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    const second = screen.getByRole('tab', { name: en.demo.scenarios[1].label });
    expect(second).toHaveAttribute('aria-selected', 'true');
    expect(second).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent(en.demo.scenarios[1].after[1].text);
  });
});

describe('Services page (Arabic and Hebrew)', () => {
  test.each(['ar', 'he'])('%s: sets <html lang/dir> while mounted and restores it afterwards', (locale) => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    const { unmount } = renderPage(locale);
    expect(document.documentElement.lang).toBe(locale);
    expect(document.documentElement.dir).toBe('rtl');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(CONTENT[locale].hero.title);
    expect(head('link[rel="canonical"]')).toHaveAttribute('href', `https://www.mohamaddev.com${PATHS[locale]}`);
    unmount();
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  test.each([
    ['ar', 'يرجى مراجعة 4 حقول قبل الإرسال.'],
    ['he', 'יש לבדוק 4 שדות לפני השליחה.'],
    ['en', 'Please check 4 fields before sending.'],
  ])('%s: empty submit uses the language’s plural form', (locale, message) => {
    renderPage(locale);
    fireEvent.click(screen.getByRole('button', { name: CONTENT[locale].form.submit }));
    expect(screen.getByRole('alert')).toHaveTextContent(message);
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test('he: in RTL the left arrow key moves to the next tab', () => {
    renderPage('he');
    const first = screen.getByRole('tab', { name: he.demo.scenarios[0].label });
    fireEvent.keyDown(first, { key: 'ArrowLeft' });
    expect(screen.getByRole('tab', { name: he.demo.scenarios[1].label })).toHaveAttribute('aria-selected', 'true');
  });

  test('ar: a Hebrew-or-Arabic visitor’s lead still reaches Mohamad in English, with the language noted', async () => {
    emailjs.send.mockResolvedValue({ status: 200 });
    renderPage('ar');
    fireEvent.click(screen.getByRole('link', { name: ar.solutions[1].cta }));
    fillValidForm(ar);
    fireEvent.click(screen.getByRole('button', { name: ar.form.submit }));
    expect(await screen.findByRole('heading', { name: /وصلتني رسالتك/ })).toBeInTheDocument();
    const [, , params] = emailjs.send.mock.calls[0];
    expect(params.service).toBe('Automation / Integration, Web Application');
    expect(params.language).toBe('العربية');
    expect(params.message).toContain('mohamaddev.com/ar/services');
  });
});

describe('Lead form', () => {
  test('blocks an empty submission, explains what is missing and focuses the first field', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: en.form.submit }));
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(within(form()).getByLabelText(en.form.name)).toHaveFocus();
    expect(within(form()).getByLabelText(en.form.email)).toHaveAttribute('aria-invalid', 'true');
  });

  test('sends the lead through EmailJS and shows a confirmation', async () => {
    emailjs.send.mockResolvedValue({ status: 200 });
    renderPage();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: en.form.submit }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    expect(await screen.findByRole('heading', { name: /thanks, dana — your message is in/i })).toBeInTheDocument();

    const [, , params] = emailjs.send.mock.calls[0];
    expect(params).toMatchObject({ name: 'Dana Levi', email: 'dana@example.com', service: 'Web Application', language: 'English' });
    expect(params.message).toContain('Orders arrive by WhatsApp');
    expect(ReactGA.event).toHaveBeenCalledWith(expect.objectContaining({ action: 'lead_form_success' }));
  });

  test('keeps what was typed and offers email when sending fails', async () => {
    emailjs.send.mockRejectedValue({ status: 500 });
    renderPage();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: en.form.submit }));

    expect(await screen.findByText(/couldn't be sent/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: en.form.failureLink }).getAttribute('href')).toMatch(/^mailto:mohamdadm25@gmail\.com\?/);
    expect(within(form()).getByLabelText(en.form.name)).toHaveValue('Dana Levi');
    await waitFor(() => expect(screen.getByRole('button', { name: en.form.submit })).toBeEnabled());
  });

  test('silently drops submissions that fill the honeypot', async () => {
    renderPage();
    fillValidForm();
    type(screen.getByLabelText('Website'), 'http://spam.example');
    fireEvent.click(screen.getByRole('button', { name: en.form.submit }));
    expect(await screen.findByRole('heading', { name: /your message is in/i })).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test('validate() and buildEmail()', () => {
    const base = { name: 'Al', company: '', email: 'a@b.co', phone: '', needs: ['unsure'], budget: '', message: 'Need help with invoices.', website: '' };
    expect(validate(base)).toEqual({});
    expect(validate({ ...base, phone: '12' })).toHaveProperty('phone');
    expect(validate({ ...base, email: 'nope' })).toHaveProperty('email');
    expect(validate({ ...base, needs: [] })).toHaveProperty('needs');
    const mail = buildEmail({ ...base, needs: ['ai', 'mobile'], budget: '2k-5k' }, 'he');
    expect(mail.service).toBe('AI Solution, Mobile Application');
    expect(mail.budget).toBe('$2,000 – $5,000');
    expect(mail.language).toBe('עברית');
  });
});
