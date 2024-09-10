import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>

      {faqData.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => toggleFAQ(index)}
        >
          <h3 className="faq-question">
            {item.question}
          </h3>
          <p className="faq-answer" style={{ maxHeight: activeIndex === index ? '1000px' : '0' }}>
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

const faqData = [
  {
    question: 'What is AbedX69 and what do we offer?',
    answer: 'AbedX69 is an innovative platform designed to offer personalized solutions and products tailored to our customers\' needs.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Creating an account is simple! Navigate to the Sign Up page, fill in your details, and you\'re part of the AbedX69 community!',
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Absolutely! We prioritize your privacy and security, ensuring that your data is encrypted and protected.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'Reach out to us on the Contact Us page, and our team will assist you with any questions or concerns.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, PayPal, and other secure gateways to ensure safe transactions.',
  },
  {
    question: 'Can I track my orders?',
    answer: 'Yes! You can track your orders on the Order Status page, and we\'ll keep you updated via email.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We have a 30-day return policy for hassle-free returns. Visit our Return Policy page for more information.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship worldwide. Check the Shipping Info page for details on times and costs.',
  },
];

export default FAQ;
