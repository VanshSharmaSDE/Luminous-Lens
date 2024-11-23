import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="animated-name">Shaily Tyagi</h3>
        <p className="footer-text">Web Developer | Creative Thinker | Artist</p>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://github.com/ShailyTyagi013" target="_blank" rel="noopener noreferrer">
            <i className="ri-github-line"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
