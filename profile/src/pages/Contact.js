import React, { useState } from 'react';
import emailjs from 'emailjs-com';  // Import EmailJS
import './Contact.css';  // Import CSS file for styling

const Contact = () => {
  // State to manage form data
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your EmailJS credentials
    emailjs.send('service_lnvb479', 'template_a0u7v3e', formData, '84NGsinnrOvnjhcHf')
      .then((result) => {
        console.log('Email successfully sent!', result.text);  // Log success message
        alert('Message sent successfully!');  // Display success alert
        setFormData({ name: '', email: '', message: '' });  // Clear the form
      }, (error) => {
        console.log('Failed to send email. Error:', error.text);  // Log error message
        alert('Failed to send message. Please try again later.');  // Display error alert
      });
  };

  return (
    <div className="contact">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="contact-button">Send Message</button>
      </form>

      {/* Direct Mail Link */}
      <a href="mailto:mohamadadm25@gmail.com" className="mail-link">Or send me an email directly</a>
    </div>
  );
};

export default Contact;
