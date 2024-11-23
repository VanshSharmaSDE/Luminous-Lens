import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in 
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/users/login`, credentials);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
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
      </header>

      <div className="login-section" id="login">
        <h2 className="section-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
