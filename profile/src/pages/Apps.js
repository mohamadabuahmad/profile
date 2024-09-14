import React from 'react';
import './Apps.css';  // Import the custom CSS file for styling

const Apps = () => {
  return (
    <div className="apps-page">
      <h1 className="apps-title">My Apps</h1>
      
      {/* Car Info App Section */}
      <section className="app-section">
        <h2 className="app-name">Car Info App</h2>
        <p className="app-description">
          The Car Info App allows users to find detailed information about cars, including the car type, model, and other specifics, by entering the car number. This app fetches data from a reliable car information API and provides users with a quick and accurate overview of the car details.
        </p>
        <ul className="app-features">
          <li>Real-time car information lookup by number.</li>
          <li>User-friendly interface for quick searches.</li>
          <li>Provides details like car model, year, manufacturer, and more.</li>
        </ul>
      </section>
     
      {/* Placeholder for Future Apps */}
     

   

    </div>
  );
};

export default Apps;
