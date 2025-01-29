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
      <section className="app-section">
  <h2 className="app-name">WhatsApp Weather & Motivation Bot</h2>
  <p className="app-description">
    The WhatsApp Weather & Motivation Bot is an automated system that sends daily **weather alerts** and **motivational quotes** to users via WhatsApp. It fetches real-time weather data and inspiring quotes using external APIs, ensuring users stay informed and motivated every day.
  </p>
  <ul className="app-features">
    <li>🌤 **Real-time weather alerts** fetched from OpenWeatherMap API.</li>
    <li>📜 **Daily motivational quotes** retrieved from RapidAPI.</li>
    <li>📲 **Automated WhatsApp messages** using Twilio API.</li>
    <li>🛠 **Customizable** message templates for different weather conditions.</li>
  </ul>
</section>


   

    </div>
  );
};

export default Apps;
