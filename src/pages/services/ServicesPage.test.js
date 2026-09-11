import React from 'react';
import { render, screen, within, waitFor, fireEvent } from '@testing-library/react';
import emailjs from 'emailjs-com';
import ReactGA from 'react-ga4';
import ServicesPage from './ServicesPage';
import { validate, buildEmail } from './components/LeadForm';
import seo from './seo.json';

jest.mock('emailjs-com', () => ({ __esModule: true, default: { send: jest.fn() } }));

const form = () => screen.getByRole('button', { name: /discuss my project/i }).closest('form');

// user-event 13 fires through a different @testing-library/dom copy than RTL configures,
// so its events skip act(); RTL's own fireEvent is always act-wrapped.
const type = (el, value) => fireEvent.change(el, { target: { value } });

const fillValidForm = () => {
  const f = within(form());
  type(f.getByLabelText(/^name/i), 'Dana Levi');
  type(f.getByLabelText(/^email/i), 'dana@example.com');
  fireEvent.click(f.getByLabelText('Web Application'));
  type(f.getByLabelText(/tell me about the problem/i), 'Orders arrive by WhatsApp and we copy them into Excel by hand.');
};

beforeEach(() => {
  emailjs.send.mockReset();
  ReactGA.event.mockClear();
});

describe('Services page', () => {
  test('leads with the business positioning and a single H1', () => {
    render(<ServicesPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('AI and digital solutions, built around your business.');
    expect(screen.getByRole('link', { name: /let's build your solution/i })).toHaveAttribute('href', '#start');
    ['Put AI to work inside your actual business.', 'Let the repetitive work run itself.', 'Things people usually ask first.']
      .forEach((name) => expect(screen.getByRole('heading', { name })).toBeInTheDocument());
  });

  test('sets page SEO while mounted and restores the site defaults afterwards', () => {
    document.title = 'Default title';
    const { unmount } = render(<ServicesPage />);
    expect(document.title).toBe(seo.title);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.mohamaddev.com/services');
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute('content', seo.description);
    unmount();
    expect(document.title).toBe('Default title');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });

  test('a service CTA pre-selects that service in the lead form and is tracked', () => {
    render(<ServicesPage />);
    fireEvent.click(screen.getByRole('link', { name: /discuss an ai solution/i }));
    expect(within(form()).getByLabelText('AI Solution')).toBeChecked();
    expect(within(form()).getByLabelText('Mobile Application')).not.toBeChecked();
    expect(ReactGA.event).toHaveBeenCalledWith({ category: 'Services', action: 'service_cta_click', label: 'service_ai' });
  });

  test('the ideas explorer filters and pre-fills the problem description', () => {
    render(<ServicesPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Mobile' }));
    const ideas = screen.getAllByRole('link', { name: /talk about this/i });
    expect(ideas).toHaveLength(1);
    fireEvent.click(ideas[0]);
    expect(within(form()).getByLabelText('Mobile Application')).toBeChecked();
    expect(within(form()).getByLabelText(/tell me about the problem/i)).toHaveValue("I'm interested in: Mobile App. ");
  });

  test('automation demo tabs switch scenario with arrow keys', () => {
    render(<ServicesPage />);
    const first = screen.getByRole('tab', { name: 'Customer inquiry' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    const second = screen.getByRole('tab', { name: 'New online order' });
    expect(second).toHaveAttribute('aria-selected', 'true');
    expect(second).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Stock is checked and reserved');
  });
});

describe('Lead form', () => {
  test('blocks an empty submission, explains what is missing and focuses the first field', () => {
    render(<ServicesPage />);
    fireEvent.click(screen.getByRole('button', { name: /discuss my project/i }));
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent('Please check 4 fields before sending.');
    expect(within(form()).getByLabelText(/^name/i)).toHaveFocus();
    expect(within(form()).getByLabelText(/^email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  test('sends the lead through EmailJS and shows a confirmation', async () => {
    emailjs.send.mockResolvedValue({ status: 200 });
    render(<ServicesPage />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /discuss my project/i }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    expect(await screen.findByRole('heading', { name: /thanks, dana — your message is in/i })).toBeInTheDocument();

    const [, , params] = emailjs.send.mock.calls[0];
    expect(params).toMatchObject({ name: 'Dana Levi', email: 'dana@example.com', service: 'Web Application' });
    expect(params.message).toContain('Orders arrive by WhatsApp');
    expect(ReactGA.event).toHaveBeenCalledWith(expect.objectContaining({ action: 'lead_form_success' }));
  });

  test('keeps what was typed and offers email when sending fails', async () => {
    emailjs.send.mockRejectedValue({ status: 500 });
    render(<ServicesPage />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /discuss my project/i }));

    expect(await screen.findByText(/couldn't be sent/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /email me directly/i }).getAttribute('href')).toMatch(/^mailto:mohamdadm25@gmail\.com\?/);
    expect(within(form()).getByLabelText(/^name/i)).toHaveValue('Dana Levi');
    await waitFor(() => expect(screen.getByRole('button', { name: /discuss my project/i })).toBeEnabled());
  });

  test('silently drops submissions that fill the honeypot', async () => {
    render(<ServicesPage />);
    fillValidForm();
    type(document.getElementById('lf-website'), 'http://spam.example');
    fireEvent.click(screen.getByRole('button', { name: /discuss my project/i }));
    expect(await screen.findByRole('heading', { name: /your message is in/i })).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test('validate() and buildEmail()', () => {
    const base = { name: 'Al', company: '', email: 'a@b.co', phone: '', needs: ['unsure'], budget: '', message: 'Need help with invoices.', website: '' };
    expect(validate(base)).toEqual({});
    expect(validate({ ...base, phone: '12' })).toHaveProperty('phone');
    expect(validate({ ...base, email: 'nope' })).toHaveProperty('email');
    expect(validate({ ...base, needs: [] })).toHaveProperty('needs');
    expect(buildEmail({ ...base, needs: ['ai', 'mobile'] }).service).toBe('AI Solution, Mobile Application');
  });
});
