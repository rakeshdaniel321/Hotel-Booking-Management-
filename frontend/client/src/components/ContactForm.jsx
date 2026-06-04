
import React, { useState, useCallback } from 'react';
import '../styles/Contact.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate form entries inline
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\s+\.\S+/.test(formData.email)) {
      // Basic validation regex patch check
      if (!formData.email.includes('@')) newErrors.email = 'Invalid email structure.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message field cannot be empty.';
    return newErrors;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear targeted field error immediately upon active typing updates
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValidationErrors = validateForm();
    
    if (Object.keys(formValidationErrors).length === 0) {
      console.log('Form submission payload captured:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' }); // Reset fields
    } else {
      setErrors(formValidationErrors);
    }
  };

  return (
    <div className="form-wrapper">
      <h3>Send Us a Message</h3>
      {submitted ? (
        <div className="alert-success" role="alert">
          Thank you! Your message has been received successfully. We'll get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'input-error' : ''}
              required
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit Inquiry</button>
        </form>
      )}
    </div>
  );
};

export default React.memo(ContactForm);