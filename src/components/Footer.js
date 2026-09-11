import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Mohamad<span className="dot">.</span></span>
          <p className="footer-tagline">
            Software Engineer &amp; Full Stack Developer building modern, reliable
            web and mobile experiences.
          </p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/apps">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
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
        <p>&copy; {new Date().getFullYear()} Mohamad Abu Ahmad. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
