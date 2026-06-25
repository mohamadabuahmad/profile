import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPhone,
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  // State to manage form data
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.log('Failed to send email. Error:', error.text);
          setStatus('error');
        }
      );
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'mohamdadm25@gmail.com',
      href: 'mailto:mohamdadm25@gmail.com',
    },
    {
      icon: <FaLinkedin />,
      label: 'Mohamad Abu Ahmad',
      href: 'https://www.linkedin.com/in/mohamad-abu-ahmad-817a82262/',
    },
    {
      icon: <FaGithub />,
      label: 'mohamadabuahmad',
      href: 'https://github.com/mohamadabuahmad',
    },
    {
      icon: <FaPhone />,
      label: '+972 54-2366982',
      href: 'tel:+972542366982',
    },
  ];

  return (
    <div className="contact">
      <div className="contact-grid">
        {/* LEFT — intro panel */}
        <motion.div
          className="contact-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h1 className="contact-headline gradient-text">
            Let&apos;s build something together
          </h1>
          <p className="contact-lead">
            Have a project in mind, a question, or just want to say hello? Drop me
            a message and I&apos;ll get back to you as soon as I can.
          </p>

          <ul className="contact-info">
            {contactInfo.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-info-row"
                >
                  <span className="contact-info-icon">{item.icon}</span>
                  <span className="contact-info-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT — form card */}
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <button
              type="submit"
              className="contact-button"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="contact-feedback contact-feedback--success">
                Message sent successfully! I&apos;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="contact-feedback contact-feedback--error">
                Something went wrong. Please try again later.
              </p>
            )}

            <a href="mailto:mohamadadm25@gmail.com" className="contact-mail-link">
              Or email me directly
            </a>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
