import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import emailjs from 'emailjs-com';
import ReactGA from 'react-ga4';
import LeadForm, { validate, buildEmail } from './LeadForm';
import { SiteProvider } from '../app/SiteContext';
import en from '../content/en.json';
import ar from '../content/ar.json';
import he from '../content/he.json';

jest.mock('emailjs-com', () => ({ __esModule: true, default: { send: jest.fn() } }));

const CONTENT = { en, ar, he };

const renderForm = (locale = 'en') =>
  render(
    <MemoryRouter>
      <SiteProvider value={{ locale, page: 'contact', t: CONTENT[locale] }}>
        <h2 id="lead-form-title">{CONTENT[locale].contact.formTitle}</h2>
        <LeadForm headingId="lead-form-title" source="contact" />
      </SiteProvider>
    </MemoryRouter>
  );

const form = (locale = 'en') => screen.getByRole('form', { name: CONTENT[locale].contact.formTitle });
const type = (el, value) => fireEvent.change(el, { target: { value } });

const fillValid = (locale = 'en') => {
  const t = CONTENT[locale].form;
  const f = within(form(locale));
  type(f.getByLabelText(t.name), 'Dana Levi');
  type(f.getByLabelText(t.email), 'dana@example.com');
  fireEvent.click(f.getByLabelText(t.needs.webapp));
  type(f.getByLabelText(t.messageLabel), 'Orders arrive by WhatsApp and we copy them into a spreadsheet.');
};

beforeEach(() => {
  emailjs.send.mockReset();
  ReactGA.event.mockClear();
});

test('blocks an empty submission and focuses the first field', () => {
  renderForm();
  fireEvent.click(screen.getByRole('button', { name: en.form.submit }));
  expect(emailjs.send).not.toHaveBeenCalled();
  expect(within(form()).getByLabelText(en.form.name)).toHaveFocus();
  expect(within(form()).getByLabelText(en.form.email)).toHaveAttribute('aria-invalid', 'true');
});

test.each([
  ['en', 'Please check 4 fields before sending.'],
  ['ar', 'يرجى مراجعة 4 حقول قبل الإرسال.'],
  ['he', 'יש לבדוק 4 שדות לפני השליחה.'],
])('%s uses its own plural form in the error summary', (locale, message) => {
  renderForm(locale);
  fireEvent.click(screen.getByRole('button', { name: CONTENT[locale].form.submit }));
  expect(screen.getByRole('alert')).toHaveTextContent(message);
});

test('sends the lead through EmailJS and confirms', async () => {
  emailjs.send.mockResolvedValue({ status: 200 });
  renderForm();
  fillValid();
  fireEvent.click(screen.getByRole('button', { name: en.form.submit }));
  expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  expect(await screen.findByRole('heading', { name: /thanks, dana/i })).toBeInTheDocument();
  const [, , params] = emailjs.send.mock.calls[0];
  expect(params).toMatchObject({ name: 'Dana Levi', email: 'dana@example.com', service: 'Web Application', language: 'English' });
  expect(ReactGA.event).toHaveBeenCalledWith(expect.objectContaining({ action: 'lead_form_success' }));
});

test('an Arabic visitor still produces an English lead email, with the language noted', async () => {
  emailjs.send.mockResolvedValue({ status: 200 });
  renderForm('ar');
  fillValid('ar');
  fireEvent.click(screen.getByRole('button', { name: ar.form.submit }));
  expect(await screen.findByRole('heading', { name: /وصلتني رسالتك/ })).toBeInTheDocument();
  const [, , params] = emailjs.send.mock.calls[0];
  expect(params.service).toBe('Web Application');
  expect(params.language).toBe('العربية');
  expect(params.message).toContain('mohamaddev.com/ar/contact');
});

test('keeps what was typed and offers email when sending fails', async () => {
  emailjs.send.mockRejectedValue({ status: 500 });
  renderForm();
  fillValid();
  fireEvent.click(screen.getByRole('button', { name: en.form.submit }));
  expect(await screen.findByText(/couldn't be sent/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: en.form.failureLink })).toHaveAttribute('href', expect.stringContaining('mailto:'));
  expect(within(form()).getByLabelText(en.form.name)).toHaveValue('Dana Levi');
  await waitFor(() => expect(screen.getByRole('button', { name: en.form.submit })).toBeEnabled());
});

test('silently drops submissions that fill the honeypot', async () => {
  renderForm();
  fillValid();
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
