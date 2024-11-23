import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/messages', formData);
      alert('Message sent!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to send message');
    }
  };

  return (
    <div className="contact-section" id="contact">
      <h2 className="section-title">Contact Me</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
