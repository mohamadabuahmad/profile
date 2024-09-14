import React from 'react';
import './Home.css';  // Import the custom CSS file for styling

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Profile Picture */}
          <img src="/profile_pic.jpg" alt="Mohamad Abu Ahmad" className="profile-picture" />
          <h1 className="hero-title">Hi, I'm Mohamad Abu Ahmad</h1>
          <p className="hero-subtitle">Software Engineering Student | Full Stack Developer</p>
          <div className="hero-buttons">
            <a href="/apps" className="hero-button">View My Apps</a>
            <a href="/contact" className="hero-button hero-button-outline">Contact Me</a>
          </div>
          {/* Download CV Button */}
          <a href="/CV.pdf" download className="cv-download-button">Download My CV</a>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview">
        <h2>About Me</h2>
        <p>
          I am a passionate Software Engineering student with a focus on developing robust and innovative software solutions. With a strong foundation in back-end development, I aim to enhance user experiences through intuitive and efficient system design.
        </p>
        <a href="/about" className="about-read-more">Read More</a>
      </section>

      {/* Featured Apps Section */}
      <section className="featured-apps">
        <h2>Featured Apps</h2>
        <div className="apps-grid">
          <div className="app-card">
            <h3>Car Info App</h3>
            <p>
              An innovative app that allows users to find detailed information about cars by entering the car number.
            </p>
            <a href="/apps" className="app-link">Learn More</a>
          </div>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="skills-overview">
        <h2>My Skills</h2>
        <p>Full Stack Development, Java, Python, JavaScript, SQL, Node.js, and more.</p>
      </section>

      {/* Contact Preview Section */}
      <section className="contact-preview">
        <h2>Get In Touch</h2>
        <p>If you are interested in collaborating or want to know more about my work, feel free to contact me.</p>
        <a href="/contact" className="contact-button">Contact Me</a>
      </section>
    </div>
  );
};

export default Home;
