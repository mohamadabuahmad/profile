import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './About.css';

const timeline = [
  {
    tag: 'Experience',
    role: 'Full Stack Developer',
    org: 'R.H Company',
    period: '2020 — 2023',
    desc: 'Developed full stack applications focusing on back-end architecture using Node.js, Express.js, and databases like MySQL and MongoDB. Collaborated with front-end teams to integrate React.js components and utilized Docker for deployment.',
  },
  {
    tag: 'Education',
    role: 'B.Sc. in Software Engineering',
    org: 'ORT Braude College',
    period: '2021 — 2026',
    desc: 'Comprehensive academic foundation in software engineering principles, algorithms, and system design.',
  },
  {
    tag: 'Education',
    role: 'Diploma in Practical Software Engineering',
    org: 'ORT Braude',
    period: '2018 — 2020',
    desc: 'Hands-on training in practical software development and engineering fundamentals.',
  },
];

const skills = [
  { group: 'Programming Languages', items: ['Python', 'Java', 'C', 'Assembly'] },
  { group: 'Web Technologies', items: ['JavaScript', 'HTML', 'CSS', 'PHP'] },
  { group: 'Databases', items: ['SQL', 'MySQL'] },
  { group: 'Operating Systems', items: ['Windows', 'Linux', 'MacOS'] },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Technologies' },
  { value: 'B.Sc.', label: 'Software Engineering' },
];

const sectionAnim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

const About = () => {
  return (
    <div className="about-page">
      {/* Hero / Intro */}
      <motion.section className="about-hero" {...sectionAnim}>
        <span className="eyebrow">About Me</span>
        <h1 className="about-headline">
          Building <span className="gradient-text">robust software</span> that
          solves real problems.
        </h1>
        <p className="about-intro">
          I am Mohamad Abu Ahmad, a Software Engineer and Full Stack Developer
          with a B.Sc. in Software Engineering from ORT Braude, passionate about
          leveraging my coding skills and innovation to develop robust software
          solutions that address real-world challenges. I specialize in back-end
          development and am proficient in multiple programming languages.
        </p>
        <div className="about-actions">
          <a
            className="btn-primary"
            href="https://www.linkedin.com/in/mohamad-abu-ahmad-817a82262/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            className="btn-ghost"
            href="https://github.com/mohamadabuahmad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </motion.section>

      {/* Stats strip */}
      <motion.section className="about-stats" {...sectionAnim}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <span className="stat-value gradient-text">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Experience & Education timeline */}
      <motion.section className="about-section" {...sectionAnim}>
        <span className="eyebrow">Journey</span>
        <h2 className="about-h2">Experience &amp; Education</h2>
        <div className="timeline">
          {timeline.map((item, i) => (
            <motion.div
              key={`${item.role}-${i}`}
              className="timeline-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <span className="timeline-dot" />
              <motion.div className="timeline-card" whileHover={{ y: -6 }}>
                <div className="timeline-card-head">
                  <span className="timeline-tag">{item.tag}</span>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-org">{item.org}</p>
                <p className="timeline-desc">{item.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section className="about-section" {...sectionAnim}>
        <span className="eyebrow">Toolbox</span>
        <h2 className="about-h2">Skills</h2>
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.group}
              className="skill-card"
              whileHover={{ y: -6 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="skill-group">{cat.group}</h3>
              <div className="skill-chips">
                {cat.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
