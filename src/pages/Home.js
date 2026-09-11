import React from 'react';
import ReactGA from 'react-ga4';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaGithub, FaArrowRight, FaDownload } from 'react-icons/fa';
import './Home.css';  // Import the custom CSS file for styling

const Home = () => {
  // Track CV Download
  const handleDownloadCV = () => {
    ReactGA.event({
      category: "Download",
      action: "Clicked CV Download",
      label: "Home Page",
    });
  };

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "10+", label: "Projects" },
    { value: "B.Sc.", label: "Software Engineering" },
  ];

  const projects = [
    {
      title: "Car Info App",
      desc: "An innovative app that allows users to find detailed information about cars by entering the car number.",
    },
    {
      title: "WhatsApp Weather & Motivation Bot",
      desc: "Daily weather alerts and motivational quotes delivered automatically via WhatsApp.",
    },
    {
      title: "Networking - Social Media Platform",
      desc: "A full-stack social app featuring posts, likes, follows, and real-time chat.",
    },
  ];

  const skills = [
    "Full Stack Development",
    "Java",
    "Python",
    "JavaScript",
    "SQL",
    "Node.js",
    "React",
    "React Native",
  ];

  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="eyebrow">Software Engineer</span>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Mohamad Abu Ahmad</span>
            </h1>
            <p className="hero-subtitle">Software Engineer | Full Stack Developer</p>

            <div className="hero-buttons">
              <motion.a
                href="/apps"
                className="btn-primary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Apps <FaArrowRight />
              </motion.a>
              <motion.a
                href="/contact"
                className="btn-ghost"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Me
              </motion.a>
              <motion.a
                href={`${process.env.PUBLIC_URL}/CV.pdf`}
                download
                onClick={handleDownloadCV}
                className="btn-ghost cv-button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaDownload /> Download My CV
              </motion.a>
            </div>

            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/mohamad-abu-ahmad-817a82262?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bnb3sIT6vQ6KywyiydjEkCA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="icon" />
              </a>
              <a href="mailto:mohamdadm25@gmail.com" aria-label="Email">
                <FaEnvelope className="icon" />
              </a>
              <a
                href="https://github.com/mohamadabuahmad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="icon" />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-avatar-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="avatar-ring">
              <img src={`${process.env.PUBLIC_URL}/profile_pic.jpg`} alt="Mohamad Abu Ahmad" className="profile-picture" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="stat-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value gradient-text">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* About Preview Section */}
      <motion.section className="section about-preview" {...reveal} transition={{ duration: 0.6, delay: 0.1 }}>
        <div className="section-wrap">
          <span className="eyebrow">About Me</span>
          <h2 className="section-title">A bit about my work</h2>
          <p className="about-text">
            I am a passionate Software Engineer and Full Stack Developer with a focus on developing robust and innovative software solutions. With a strong foundation in back-end development, I aim to enhance user experiences through intuitive and efficient system design.
          </p>
          <a href="/about" className="text-link">
            Read More <FaArrowRight />
          </a>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section className="section featured-apps" {...reveal} transition={{ duration: 0.6, delay: 0.1 }}>
        <div className="section-wrap">
          <span className="eyebrow">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <div className="apps-grid">
            {projects.map((p) => (
              <motion.div className="app-card" key={p.title} whileHover={{ y: -6 }}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <a href="/apps" className="text-link">
                  Learn More <FaArrowRight />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Overview Section */}
      <motion.section className="section skills-overview" {...reveal} transition={{ duration: 0.6, delay: 0.1 }}>
        <div className="section-wrap">
          <span className="eyebrow">Tech Stack</span>
          <h2 className="section-title">My Skills</h2>
          <div className="skills-chips">
            {skills.map((skill) => (
              <motion.span className="skill-chip" key={skill} whileHover={{ y: -4 }}>
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section className="section contact-preview" {...reveal} transition={{ duration: 0.6, delay: 0.1 }}>
        <div className="section-wrap">
          <div className="cta-card">
            <h2 className="section-title">Get In Touch</h2>
            <p>If you are interested in collaborating or want to know more about my work, feel free to contact me.</p>
            <motion.a href="/contact" className="btn-primary" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              Contact Me <FaArrowRight />
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
