import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Footer from './Footer';

const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isMessagesPopupVisible, setIsMessagesPopupVisible] = useState(false);
  const [isBlogsPopupVisible, setIsBlogsPopupVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState([]);

  // Blog states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState(null);

  useEffect(() => {
    fetchImages();
    fetchMessages();
    fetchBlogs();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/messages');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
      await axios.post('http://localhost:5000/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Image uploaded');
      setName('');
      setDescription('');
      setImageFile(null);
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', blogContent);
    formData.append('image', blogImage);

    try {
      await axios.post('http://localhost:5000/blogs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Blog uploaded');
      setBlogTitle('');
      setBlogContent('');
      setBlogImage(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImages = async () => {
    try {
      await axios.post('http://localhost:5000/images/delete', { ids: selectedImages });
      alert('Images deleted');
      setSelectedImages([]);
      setIsDeletePopupVisible(false);
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessages = async () => {
    try {
      await axios.post('http://localhost:5000/messages/delete', { ids: selectedMessages });
      alert('Messages deleted');
      setSelectedMessages([]);
      setIsMessagesPopupVisible(false);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlogs = async () => {
    try {
      await axios.post('http://localhost:5000/blogs/delete', { ids: selectedBlogs });
      alert('Blogs deleted');
      setSelectedBlogs([]);
      setIsBlogsPopupVisible(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDeletePopup = () => {
    setIsDeletePopupVisible(!isDeletePopupVisible);
  };

  const toggleMessagesPopup = () => {
    setIsMessagesPopupVisible(!isMessagesPopupVisible);
  };

  const toggleBlogsPopup = () => {
    setIsBlogsPopupVisible(!isBlogsPopupVisible);
  };

  const handleImageSelect = (id) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleMessageSelect = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(messageId => messageId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const handleBlogSelect = (id) => {
    if (selectedBlogs.includes(id)) {
      setSelectedBlogs(selectedBlogs.filter(blogId => blogId !== id));
    } else {
      setSelectedBlogs([...selectedBlogs, id]);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
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
            <a href="/blog" onClick={() => navigate('/blog')}>Blog</a>
          </nav>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
        </div>
        <div className={`social-icons ${isMenuOpen ? 'social-icons-open' : ''}`}>
          <i className="ri-instagram-line"></i>
          <i className="ri-github-line" onClick={() => navigateTo('https://github.com/ShailyTyagi013')}></i>
          <i className="ri-logout-box-r-line" onClick={() => logout()}></i>
        </div>
      </header>

      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <form className="upload-form" onSubmit={handleUpload}>
          <div className="input-group">
            <label htmlFor="name">Image Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Image Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImageFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="upload-button">Upload Image</button>
        </form>

        <form className="upload-form" onSubmit={handleBlogUpload}>
          <div className="input-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="content">Blog Content</label>
            <textarea
              id="content"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="blogImage">Upload Blog Image</label>
            <input
              type="file"
              id="blogImage"
              onChange={(e) => setBlogImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="upload-button">Upload Blog</button>
        </form>

        <button onClick={toggleDeletePopup} className="delete-button">Delete Images</button>
        <button onClick={toggleMessagesPopup} className="messages-button">Messages</button>
        <button onClick={toggleBlogsPopup} className="blogs-button">Delete Blogs</button>

        {isDeletePopupVisible && (
          <div className="delete-popup-overlay">
            <div className="delete-popup-content">
              <h2>Select Images to Delete</h2>
              <div className="delete-image-list">
                {images.map(image => (
                  <div
                    key={image._id}
                    className={`delete-image-item ${selectedImages.includes(image._id) ? 'selected' : ''}`}
                    onClick={() => handleImageSelect(image._id)}
                  >
                    <img src={image.url} alt={image.name} className="delete-image-thumbnail" />
                    <p>{image.name}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleDeleteImages} className="confirm-delete-button">Delete Selected Images</button>
              <button onClick={toggleDeletePopup} className="cancel-button">Cancel</button>
            </div>
          </div>
        )}

        {isMessagesPopupVisible && (
          <div className="messages-popup-overlay">
            <div className="messages-popup-content">
              <h2>Messages from People</h2>
              <div className="messages-list">
                {messages.map(message => (
                  <div
                    key={message._id}
                    className={`message-item ${selectedMessages.includes(message._id) ? 'selected' : ''}`}
                    onClick={() => handleMessageSelect(message._id)}
                  >
                    <p><strong>Name:</strong> {message.name}</p>
                    <p><strong>Email:</strong> {message.email}</p>
                    <p><strong>Message:</strong> {message.message}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleDeleteMessages} className="confirm-delete-button">Delete Selected Messages</button>
              <button onClick={toggleMessagesPopup} className="cancel-button">Close</button>
            </div>
          </div>
        )}

        {isBlogsPopupVisible && (
          <div className="blogs-popup-overlay">
            <div className="blogs-popup-content">
              <h2>Select Blogs to Delete</h2>
              <div className="delete-blog-list">
                {blogs.map(blog => (
                  <div
                    key={blog._id}
                    className={`delete-blog-item ${selectedBlogs.includes(blog._id) ? 'selected' : ''}`}
                    onClick={() => handleBlogSelect(blog._id)}
                  >
                    <img src={blog.image} alt={blog.title} className="delete-blog-thumbnail" />
                    <p>{blog.title}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleDeleteBlogs} className="confirm-delete-button">Delete Selected Blogs</button>
              <button onClick={toggleBlogsPopup} className="cancel-button">Cancel</button>
            </div>
          </div>
        )}

        <h2 className="section-title">Uploaded Images</h2>
        <div className="image-list">
          {images.map((image) => (
            <div key={image._id} className="image-item">
              <img src={image.url} alt={image.name} className="image-thumbnail" />
              <div className="image-info">
                <h3>{image.name}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title">Uploaded Blogs</h2>
        <div className="image-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="image-item">
              <img src={blog.image} alt={blog.title} className="image-thumbnail" />
              <div className="image-info">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
