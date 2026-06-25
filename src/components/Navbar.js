import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { FaSun, FaMoon } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/apps', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <span className="nav-logo-mark">M</span>
        <span className="nav-logo-text">Mohamad<span className="dot">.</span></span>
      </Link>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${pathname === l.to ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        <button className="theme-toggle-button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        <button
          className="menu-toggle-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
