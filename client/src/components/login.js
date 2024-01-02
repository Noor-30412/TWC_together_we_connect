// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
        <div className='container'>
        <div className="form-box login">
          <div className="form-details">
            <h2>Welcome Back</h2>
            <p>Please log in using your personal information to stay connected with us.</p>
          </div>
          <div className="form-content">
           
            <form onSubmit={handleLogin}>
              <div className="input-field">
                <input
                  type="text"
                  name="identifier"
                  value={loginData.identifier}
                  onChange={handleInputChange}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
                <label>Password</label>
              </div>
              
              <button type="submit">Log In</button>
              <a href="#" className="forgot-pass-link">
                Forgot password?
              </a>
            </form>
            <div className="bottom-link">
              Don't have an account?
              <a href="/signup" id="signup-link" onClick={showLoginForm}>
                Signup
              </a>
            </div>
          </div>
        </div>
        </div>  
    </>
  );
};

// Export the component
export default Login;
