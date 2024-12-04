import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blog.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const navigate = useNavigate();
    const [popupContent, setPopupContent] = useState({ description: '', image: '' });
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/blogs');
                setBlogPosts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBlogs();
    }, []);

    const handlePopup = (content) => {
        setPopupContent(content);
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
                        <a href="/gallery" onClick={() => navigate('/gallery')}>Gallery</a>
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

            <div className="blog-section" id="blog">
                <h2 className="section-title">Blog Section</h2>
                <div className="blog-grid">
                    {blogPosts.map(post => (
                        <div key={post._id} className="blog-post" onClick={() => handlePopup({ description: post.content, image: post.image })}>
                            <img src={post.image} alt={post.title} className="blog-image" />
                            <h3 className="blog-title">{post.title}</h3>
                            <p className="blog-excerpt">{post.content.substring(0, 60)}...</p>
                        </div>
                    ))}
                </div>

                {isPopupVisible && (
                    <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup-content animated-popup" onClick={(e) => e.stopPropagation()}>
                            <img src={popupContent.image} alt="Blog Visual" className="popup-image" />
                            <p>{popupContent.description}</p>
                            <button className="close-btn" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Blog;
