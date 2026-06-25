import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiGithub, FiExternalLink } from 'react-icons/fi';
import './Apps.css';

const projects = [
  {
    icon: '🚗',
    title: 'Car Info Lookup (iOS & Android)',
    tags: ['Swift', 'Java', 'iOS', 'Android', 'REST API'],
    description:
      'Cross-platform application that retrieves detailed vehicle information from a provided license plate number. Built as two separate codebases — iOS in Swift and Android in Java — for a seamless, native experience on each platform.',
    features: [
      'Input a license plate to get make, model, year, and other details.',
      'Fetches real-time or stored vehicle data via an external API or database.',
      'Use cases: vehicle verification, parking systems, and quick reference checks.',
      'Consistent UI/UX across platforms with low latency and secure query handling.',
    ],
    links: [
      {
        label: 'Android',
        href: 'https://github.com/mohamadabuahmad/Car-info-Android.git',
        primary: true,
      },
      {
        label: 'iOS',
        href: 'https://github.com/mohamadabuahmad/Car-info-iOS-.git',
        primary: false,
      },
    ],
  },
  {
    icon: '☀️',
    title: 'WhatsApp Weather & Motivation Bot',
    tags: ['Node.js', 'Twilio', 'OpenWeatherMap', 'RapidAPI'],
    description:
      'Automated system that sends daily weather alerts and motivational quotes to users via WhatsApp, keeping them informed and inspired every single day.',
    features: [
      'Real-time weather alerts fetched from the OpenWeatherMap API.',
      'Daily motivational quotes retrieved from RapidAPI.',
      'Automated WhatsApp messages delivered through the Twilio API.',
      'Customizable message templates for different weather conditions.',
    ],
    links: [
      {
        label: 'View Project',
        href: 'https://github.com/mohamadabuahmad/Automation_Whatsapp.git',
        primary: true,
      },
    ],
  },
  {
    icon: '🌲',
    title: 'Go Nature - Park Management System',
    tags: ['Java', 'JDBC', 'Client-Server'],
    description:
      'Java-based application designed to streamline park service management. An academic project built with teammates Shady Mansour, Marwa Hamoud, Eyas Rizik, and Anood Naem, delivering robust features for both administrators and visitors.',
    features: [
      'Java with OOP principles and a scalable, maintainable architecture.',
      'JDBC for database operations and reliable data integrity.',
      'Peer-to-peer networking for real-time client-server communication.',
      'Intuitive, user-friendly interfaces built through strong team collaboration.',
    ],
    links: [
      {
        label: 'View Project',
        href: 'https://github.com/mohamadabuahmad/Go-Nature.git',
        primary: true,
      },
    ],
  },
  {
    icon: '🌐',
    title: 'Networking - Social Media Platform',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB', 'WebSockets'],
    description:
      'Full-stack social media application where users register, post, like, comment, follow others, and exchange direct messages in real-time — a responsive, feature-rich experience built on modern web technologies.',
    features: [
      'Secure authentication: sign-up, login, and password recovery via security questions.',
      'Interactive posts and feeds with live like, comment, and follow notifications.',
      'Peer-to-peer real-time messaging powered by WebSockets.',
      'Dark mode and a fully responsive UI.',
      'Stack: React (Next.js), Tailwind, Axios, Node.js (Express), MongoDB Atlas, JWT — deployed on Vercel.',
    ],
    links: [
      {
        label: 'View Project',
        href: 'https://github.com/mohamadabuahmad/Social-Media-Platform.git',
        primary: true,
      },
    ],
  },
];

const Apps = () => {
  return (
    <div className="apps-page">
      <div className="apps-wrap">
        <motion.header
          className="apps-header"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">My Work</span>
          <h1 className="apps-title">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="apps-subtitle">
            A selection of applications I&apos;ve designed and built across web,
            mobile, and systems.
          </p>
        </motion.header>

        <div className="apps-grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="card-head">
                <span className="card-icon" aria-hidden="true">
                  {project.icon}
                </span>
                <h2 className="card-title">{project.title}</h2>
              </div>

              <div className="card-tags">
                {project.tags.map((tag) => (
                  <span className="tag-pill" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="card-description">{project.description}</p>

              <ul className="card-features">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <FiCheck className="feature-icon" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="card-links">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    className={link.primary ? 'btn-primary' : 'btn-ghost'}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.links.length > 1 ? <FiGithub /> : <FiExternalLink />}
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apps;
