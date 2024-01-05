// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
  // State and function declarations
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  // Event handler for input changes
  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  // Event handler for the login form submission
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

  // Function to show the login form
  const showLoginForm = () => {
    setShowLogin(true);
  };

  // Function to hide the login form
  const hideLoginForm = () => {
    setShowLogin(false);
  };

  // JSX structure of the component
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
          <div className="login">
        <div className="form-details">
          <h2>Welcome Back</h2>
          <p>Please log in using your personal information to stay connected with us.</p>
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

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <a href="#" className="forgot-pass-link">
              Forgot password?
            </a>

            <div className="text-center">
              Don't have an account?<a href="/signup">Create Here</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// Export the component
export default Login;
