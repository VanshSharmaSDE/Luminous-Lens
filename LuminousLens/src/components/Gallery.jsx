import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [popupContent, setPopupContent] = useState({ description: '', image: '' });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/images');
        setImages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePopup = (image) => {
    setPopupContent(image);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupContent({ description: '', image: '' });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navbar Section */}
      <header className="header">
        <div className="left-section">
          <div className="logo">LuminousLens</div>
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="/" onClick={() => navigate('/')}>Home</a>
            <a href="/blog" onClick={() => navigate('/blog')}>Blog</a>
          </nav>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
        </div>
        <div className={`social-icons ${isMenuOpen ? 'social-icons-open' : ''}`}>
          <i className="ri-instagram-line"></i>
          <i className="ri-github-line" onClick={() => navigateTo('https://github.com/')}></i>
          <i className="ri-user-3-line" onClick={() => navigate('/login')}></i>
        </div>
      </header>

      <div className="gallery-section" id="gallery">
        <h2 className="section-title">Image Gallery</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="gallery-grid">
          {filteredImages.map(image => (
            <div key={image._id} className="gallery-item" onClick={() => handlePopup(image)}>
              <img src={image.url} alt={image.name} className="gallery-image" />
              <p className="gallery-name">{image.name}</p>
            </div>
          ))}
        </div>

        {isPopupVisible && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content animated-popup" onClick={(e) => e.stopPropagation()}>
              <img src={popupContent.url} alt="Popup Visual" className="popup-image" />
              <p>{popupContent.description}</p>
              <button className="close-btn" onClick={closePopup}>Close</button>
              <a href={popupContent.url} download className="download-btn">Download</a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
