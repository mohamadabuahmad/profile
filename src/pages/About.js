import React from 'react';
import './About.css';  // Import the custom CSS file for styling

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About Me</h1>
      <p className="about-description">
        I am Mohamad Abu Ahmad, a 3rd-year Software Engineering student at ORT Braude, passionate about leveraging my coding skills and innovation to develop robust software solutions that address real-world challenges. I specialize in back-end development and am proficient in multiple programming languages.
      </p>

      <section className="about-section">
        <h2 className="section-title">Experience</h2>
        <p>
          Full Stack Developer at R.H Company (2020-2021): Developed full stack applications focusing on back-end architecture using Node.js, Express.js, and databases like MySQL and MongoDB. Collaborated with front-end teams to integrate React.js components and utilized Docker for deployment.
        </p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Education</h2>
        <p>B.Sc. in Software Engineering (2021-2026) at ORT Braude College.</p>
        <p>Diploma in Practical Software Engineering (2018-2020) at ORT Braude.</p>
      </section>

      <section className="about-section">
        <h2 className="section-title">Skills</h2>
        <ul className="skills-list">
          <li>Programming Languages: Python, Java, C, Assembly, C++</li>
          <li>Web Technologies: JavaScript, HTML, CSS, PHP</li>
          <li>Databases: SQL, MySQL</li>
          <li>Operating Systems: Windows, Linux, MacOS</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">Links</h2>
        <p>
          <a href="https://www.linkedin.com/in/mohamad-abu-ahmad-817a82262/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
          <a href="https://github.com/mohamadabuahmad" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </section>
    </div>
  );
};

export default About;
