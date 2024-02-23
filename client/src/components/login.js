import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const backgroundImages = [
  'https://source.unsplash.com/random/1920x1080/?nature,water',
  'https://source.unsplash.com/random/1920x1080/?nature,mountains',
  'https://source.unsplash.com/random/1920x1080/?nature,forest',
  'https://source.unsplash.com/random/1920x1080/?nature,beach',
  'https://source.unsplash.com/random/1920x1080/?nature,sky',
];

const Login = () => {
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', loginData);
      const { token, userId, username } = response.data;
      console.log('User logged in:', username);
      login({ token, userId, username });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login');
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Auth-form-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <div className="login">
            <div className="form-details">
              <h2 className="text-black">Welcome Back</h2>
              <p className="text-black">Please log in using your personal information to stay connected with us.</p>
            </div>
          </div>
          <h3 className="Auth-form-title">LOGIN</h3>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-1"
              name="identifier"
              placeholder="Username or Email"
              value={loginData.identifier}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control mt-1"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <div className="form-group mt-4">
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
          <div className="Auth-form-toggle">
            <p className="text-black mt-3">
              Don't have an account?{' '}
              <a onClick={() => navigate('/signup')} className="text-warning" style={{ cursor: 'pointer' }}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
