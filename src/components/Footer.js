import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { CHROME, LOCALES, localeFromPath } from '../i18n/locales';
import './Footer.css';

const Footer = () => {
  const locale = localeFromPath(useLocation().pathname);
  const text = CHROME[locale];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo" dir="ltr">Mohamad<span className="dot">.</span></span>
          <p className="footer-tagline">{text.tagline}</p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>{text.navigate}</h4>
            <Link to="/">{text.nav.home}</Link>
            <Link to={LOCALES[locale].servicesPath}>{text.nav.services}</Link>
            <Link to="/apps">{text.nav.projects}</Link>
            <Link to="/about">{text.nav.about}</Link>
            <Link to="/contact">{text.nav.contact}</Link>
          </div>

          <div className="footer-col">
            <h4>{text.connect}</h4>
            <div className="footer-socials">
              <a
                href="https://www.linkedin.com/in/mohamad-abu-ahmad-817a82262/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/mohamadabuahmad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://instagram.com/mohamadaa.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a href="mailto:mohamdadm25@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <bdi>Mohamad Abu Ahmad.</bdi> {text.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
