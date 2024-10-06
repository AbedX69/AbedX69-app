import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate(); // Import and initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    let errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!formData.message) {
      errors.message = 'Message is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitted(true);

    // In a real-world app, you would send the form data to the backend here

    setFormData({ name: '', email: '', message: '' });
  };

  // Automatically navigate to WelcomePage after 2 seconds when form is submitted
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      {isSubmitted && <p className="success-message">Thank you! Your message has been sent.</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? 'input-error' : ''}
            placeholder="Enter your name"
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? 'input-error' : ''}
            placeholder="Enter your email"
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={formErrors.message ? 'input-error' : ''}
            placeholder="Enter your message"
          />
          {formErrors.message && <span className="error-message">{formErrors.message}</span>}
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
