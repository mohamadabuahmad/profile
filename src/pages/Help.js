import React from 'react';
import './Help.css';  // Import CSS file

const Help = () => {
  const faqs = [
    { question: 'How to use App One?', answer: 'Here is how you use App One...' },
    { question: 'How to contact support?', answer: 'You can contact support via our contact page.' },
  ];

  return (
    <div className="help">
      <h1>Help & Support</h1>
      <div className="faq-section">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
