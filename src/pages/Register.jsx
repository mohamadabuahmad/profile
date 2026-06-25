import React, { useState } from "react";
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    whatsapp: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation and submit logic
    console.log("Submitting:", formData);
  };

  return (
    <div className="register-page">
      <section className="register-hero">
        <div className="register-hero-content">
          <h1>Start Your Free Trial</h1>
          <p>Access the AI Chatbot, appointment booking, and reporting tools with one simple sign-up.</p>
        </div>
      </section>

      <section className="register-form-section">
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="business"
            placeholder="Business Name (optional)"
            value={formData.business}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp Number"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-submit-button">Start Free Trial</button>
        </form>
      </section>
    </div>
  );
};

export default Register;
