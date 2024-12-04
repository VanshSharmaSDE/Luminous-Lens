import React, { useState } from 'react';
import "./LandingPage.css";
import About from './About';
import Contact from './Contact';
import "remixicon/fonts/remixicon.css"; // Ensure Remix icons are installed and imported
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    window.location.href = `${path}`;
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container">
      {/* Navbar Section */}
      <header className="header">
        <div className="left-section">
          <div className="logo">LuminousLens</div>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="/gallery" onClick={() => navigate('/gallery')}>Gallery</a>
            <a href="/blog" onClick={() => navigate('/blog')}>Blog</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
        </div>
        <div className={`social-icons ${isMenuOpen ? 'social-icons-open' : ''}`}>
          <i className="ri-instagram-line"></i>
          <i className="ri-github-line" onClick={()=>navigateTo('https://github.com/VanshSharmaSDE')}></i>
          <i className="ri-user-3-line" onClick={() => navigate('/login')}></i>
        </div>
      </header>

      {/* Landing Page Section */}
      <div className="landing-page">
        <div className="background-images">
          {/* Add images for the bento-style background */}
          <img src="https://th.bing.com/th?id=OIP.QvYU7M51Yuak-xuAU7XqQQHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Background 1" className="bento-bg bento-bg-1" />
          <img src="https://th.bing.com/th?id=OIP.QvYU7M51Yuak-xuAU7XqQQHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Background 2" className="bento-bg bento-bg-2" />
          <img src="https://th.bing.com/th?id=OIP.QvYU7M51Yuak-xuAU7XqQQHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Background 3" className="bento-bg bento-bg-3" />
          <img src="https://th.bing.com/th?id=OIP.QvYU7M51Yuak-xuAU7XqQQHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Background 4" className="bento-bg bento-bg-4" />
        </div>
        <div className="background-shapes">
          <div className="shape circle"></div>
          <div className="shape triangle"></div>
          <div className="shape square"></div>
          <div className="shape ellipse"></div>
        </div>
        <div className="content">
          <h4>Hello, I'm</h4>
          <h1>User Sharma</h1>
          <h3>Owner of Luminous Lens</h3>
          <button className="download-btn" onClick={() => navigate('/gallery')}>Get Started</button>
        </div>
      </div>

      <About />

      {/* Image Section (Bento Grid) */}
      <div className="image-section">
        <h2 className="section-title">Image Gallery</h2>
        <div className="bento-grid">
          <div className="bento-item large">
            <img src="https://images.unsplash.com/photo-1723743809921-07781a7c6535?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D" alt="Project 1" />
          </div>
          <div className="bento-item">
            <img src="https://images.unsplash.com/photo-1723886738851-db052605153b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDV8fHxlbnwwfHx8fHw%3D" alt="Project 2" />
          </div>
          <div className="bento-item tall">
            <img src="https://plus.unsplash.com/premium_photo-1723669629793-24dba60d5922?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzZ8fHxlbnwwfHx8fHw%3D" alt="Project 3" />
          </div>
          <div className="bento-item">
            <img src="https://images.unsplash.com/photo-1723663758069-f62e8a5db92e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDl8fHxlbnwwfHx8fHw%3D" alt="Project 2" />
          </div>
          <div className="bento-item">
            <img src="https://images.unsplash.com/photo-1721228426981-fd7c37ff6870?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NTl8fHxlbnwwfHx8fHw%3D" alt="Project 4" />
          </div>
          <h1>"Capture the moment." <span>Shaily</span>!</h1>
          <div className="bento-item wide">
            <img src="https://plus.unsplash.com/premium_photo-1723733593117-911425368240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NjB8fHxlbnwwfHx8fHw%3D" alt="Project 5" />
          </div>
          <div className="bento-item">
            <img src="https://plus.unsplash.com/premium_photo-1723826044813-23f32593b6c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDh8fHxlbnwwfHx8fHw%3D" alt="Project 6" />
          </div>
          <div className="bento-item">
            <img src="https://images.unsplash.com/photo-1723748972084-4124765e0a55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDd8fHxlbnwwfHx8fHw%3D" alt="Project 2" />
          </div>
          <div className="bento-item wide">
            <img src="https://plus.unsplash.com/premium_photo-1721769390364-f6029aceeba4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mjh8fHxlbnwwfHx8fHw%3D" alt="Project 5" />
          </div>
          <h1>"Frame your vision."</h1>
        </div>
        <button className="more-btn" onClick={() => navigate('/gallery')}>More...</button>
      </div>

      <Contact />

      <Footer />
    </div>
  );
};

export default LandingPage;
