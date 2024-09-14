import React from 'react';
import './Portfolio.css';  // Import CSS file

const Portfolio = () => {
  const apps = [
    { id: 1, name: 'App One', description: 'Description of App One', link: '#' },
    { id: 2, name: 'App Two', description: 'Description of App Two', link: '#' },
  ];

  return (
    <div className="portfolio">
      <h1>My Portfolio</h1>
      <div className="portfolio-grid">
        {apps.map((app) => (
          <div key={app.id} className="portfolio-item">
            <h2>{app.name}</h2>
            <p>{app.description}</p>
            <a href={app.link} className="portfolio-link">View on App Store</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
