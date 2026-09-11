import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page hero', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Mohamad Abu Ahmad/);
});

// On GitHub Pages the site lives under /profile-mohamad, so root paths like /CV.pdf 404.
test('loads public assets relative to PUBLIC_URL', () => {
  const original = process.env.PUBLIC_URL;
  process.env.PUBLIC_URL = '/profile-mohamad';
  window.history.pushState({}, '', '/profile-mohamad/');
  try {
    render(<App />);
    expect(screen.getByAltText('Mohamad Abu Ahmad')).toHaveAttribute(
      'src',
      '/profile-mohamad/profile_pic.jpg'
    );
    expect(screen.getByRole('link', { name: /download my cv/i })).toHaveAttribute(
      'href',
      '/profile-mohamad/CV.pdf'
    );
  } finally {
    process.env.PUBLIC_URL = original;
    window.history.pushState({}, '', '/');
  }
});
