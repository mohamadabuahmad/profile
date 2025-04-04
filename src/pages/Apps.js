import React from 'react';
import './Apps.css';  // Import the custom CSS file for styling
import ImageSlider from "../components/ImageSlider"; // Import slider component

const Apps = () => {
    // Image sets for each project
    const robotWaiterImages = [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
  
    ];
  

  return (
    <div className="apps-page">
    <h1 className="apps-title">Projects</h1>
      
  



 
      <section className="app-section">
  <h2 className="app-name">Car Info Lookup (iOS & Android)</h2>
  <p className="app-description">
    Car Info Lookup is a cross-platform application that retrieves detailed vehicle 
    information based on a provided license plate number. Developed as two separate 
    codebases—one for iOS and one for Android—the app seamlessly fetches relevant 
    car data, streamlining vehicle identification for various purposes.
  </p>
  <ul className="app-features">
    <li>📱 <strong>Two Platforms</strong>: 
      <ul>
        <li><strong>iOS</strong>: Built with Swift .</li>
        <li><strong>Android</strong>: Built with Java.</li>
      </ul>
    </li>
    <li>🔍 <strong>Key Feature</strong>: Input a car’s license plate number to retrieve make, model, year, and other essential details.</li>
    <li>🌐 <strong>Data Integration</strong>: Fetches real-time or stored vehicle data from an external API or internal database.</li>
    <li>💡 <strong>Use Cases</strong>: Ideal for vehicle verification, parking systems, or quick reference checks.</li>
    <li>🛠️ <strong>Notable Aspects</strong>:
      <ul>
        <li>Consistent UI/UX across both iOS and Android platforms.</li>
        <li>Optimized for minimal latency in data retrieval.</li>
        <li>Secure handling of user queries and data.</li>
      </ul>
    </li>
    <li>🔗 <strong>Project Link</strong>:
      <a 
        href="https://github.com/mohamadabuahmad/Car-info-Android.git" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        More Details About Car Info Lookup (Android)
      </a>
      
    </li>
    <li>🔗 <strong>Project Link</strong>:
      <a 
        href="https://github.com/mohamadabuahmad/Car-info-iOS-.git" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        More Details AboutCar Info Lookup (iOS )
      </a>
      
    </li>
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
    <li>🔗 <strong>Project Link</strong>:
      <a 
        href="https://github.com/mohamadabuahmad/Automation_Whatsapp.git" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        More Details About WhatsApp Weather & Motivation Bot
      </a>
    </li>
  </ul>
</section>


<section className="app-section">
  <h2 className="app-name">Go Nature - Park Management System</h2>
  <p className="app-description">
    Go Nature is a Java-based application designed to streamline park service 
    management. Developed in collaboration with my talented teammates—Shady Mansour, 
    Marwa Hamoud, Eyas Rizik, and Anood Naem—this project was an academic venture 
    that showcases efficient, convenient, and robust features for both park 
    administrators and visitors. 
  </p>
  <ul className="app-features">
    <li>👨‍💻 <strong>Technologies Used</strong>:
      <ul>
        <li><strong>Java</strong> for object-oriented programming and scalable architecture.</li>
        <li><strong>JDBC</strong> for database operations and data integrity.</li>
        <li><strong>Peer-to-Peer Networking</strong> for real-time communication and updates.</li>
      </ul>
    </li>
    <li>🛠️ <strong>Skills Enhanced</strong>:
      <ul>
        <li>Mastering Java and OOP principles for maintainable software development.</li>
        <li>Efficiently managing databases to maintain data consistency.</li>
        <li>Implementing real-time data communication between clients and servers.</li>
        <li>Designing intuitive, user-friendly interfaces.</li>
        <li>Collaborating effectively within a diverse team environment.</li>
      </ul>
    </li>
    <li>🌟 <strong>Academic Achievement</strong>:
      <p>
        This project reflects the culmination of our coursework, integrating 
        theoretical knowledge with hands-on practice. We’re excited about its 
        potential to enhance park management efficiency and user satisfaction.
      </p>
    </li>
    <li>🔗 <strong>Project Link</strong>:
      <a 
        href="https://github.com/mohamadabuahmad/Go-Nature.git" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        More Details About Go Nature
      </a>
    </li>
  </ul>
</section>


<section className="app-section">
  <h2 className="app-name">Networking - Social Media Platform</h2>
  <p className="app-description">
    Networking is a full-stack social media application that empowers users to 
    register, post, like, comment, follow other users, and exchange direct messages 
    in real-time. It provides a responsive, feature-rich experience with secure 
    authentication, live notifications, and customizable profiles—all built on 
    modern web technologies.
  </p>
  <ul className="app-features">
    <li>✅ <strong>User Authentication</strong>: Secure sign-up, login, and password recovery via security questions.</li>

    <li>💬 <strong>Interactive Posts & Feeds</strong>: Create posts, like, comment, follow/unfollow, and more.</li>
    <li>🔔 <strong>Real-time Notifications</strong>: Instant alerts for likes, comments, follows, and new messages.</li>
    <li>💻 <strong>Peer-to-Peer Messaging</strong>: Real-time chats powered by WebSockets.</li>
    <li>🌙 <strong>Dark Mode & Responsive UI</strong>: Smooth dark mode toggle and fully responsive design.</li>
    <li>🛠 <strong>Tech Stack</strong>: 
      <ul>
        <li>Frontend: React.js (Next.js), Tailwind CSS, Axios</li>
        <li>Backend: Node.js (Express.js), MongoDB (MongoDB Atlas), JWT Authentication, WebSockets</li>
        <li>Deployment: Vercel (Frontend) & Vercel + MongoDB Atlas (Backend)</li>
      </ul>
    </li>
    <li>🔗 <strong>Project Link</strong>:
      <a 
        href="https://github.com/mohamadabuahmad/Social-Media-Platform.git" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        More Details About Networking - Social Media Platform
      </a>
    </li>
  </ul>
</section>
{/* <section className="app-section">
  <h2 className="app-name">Restaurant Robot Waiter</h2>
  <p className="app-description">
    The **Restaurant Robot Waiter** is a fully functional robot designed to automate food 
    delivery in restaurants. Built at age 18 as a school project, this robot operates in both 
    **autonomous** and **manual modes**, navigating seamlessly with **omni-wheels** for full directional movement. 
    It is controlled via a **custom-built controller** or **smartphone app**, enhancing efficiency in hospitality environments.
  </p>
  <ul className="app-features">
    <li>🤖 <strong>Technology Used</strong>:
      <ul>
        <li>**Arduino Uno** - The central microcontroller for processing commands.</li>
        <li>**Motor Drivers (L298N, BTS7960)** - Controls the speed and direction of the motors.</li>
        <li>**Omni-Wheels** - Enables smooth, multi-directional movement.</li>
        <li>**Battery Pack (12V NiMH)** - Provides power to the system.</li>
        <li>**Custom Wireless Controller** - Used to manually operate the robot.</li>
        <li>**Ultrasonic & IR Sensors (optional)** - Can be added for obstacle detection.</li>
      </ul>
    </li>
    
    <li>🎯 <strong>Key Features</strong>:
      <ul>
        <li>Manually controlled via a custom-built **wireless controller**.</li>
        <li>Can be programmed for **autonomous navigation**.</li>
        <li>Built-in **tray system** to transport food and drinks.</li>
        <li>**Omni-wheel system** for smooth movement in any direction.</li>
      </ul>
    </li>

    <li>🍽️ <strong>Use Cases</strong>: 
      <p>
        Ideal for **restaurants**, **cafeterias**, and **smart hospitality services**, improving efficiency by reducing staff workload.
      </p>
    </li>

  </ul>
  <ImageSlider images={robotWaiterImages} />

</section> */}
</div>
  );
};

export default Apps;
