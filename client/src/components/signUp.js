import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css'; // Import the shared CSS file

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    altMobileNumber: '',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/users/register', userData);
      console.log(response.data);
    } catch (error) {
      console.error('Signup error:', error.response.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-box signup">
          <div className="form-details">
            <h2>Create an Account</h2>
            <p>Join us by creating your account and start exploring our services.</p>
          </div>
          <div className="form-content">
            <form>
              <div className="input-field">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleInputChange}
                />
                <label>Username</label>
              </div>
              <div className="input-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
                <label>Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
                <label>Password</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleInputChange}
                />
                <label>First Name</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                />
                <label>Last Name</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  onChange={handleInputChange}
                />
                <label>Mobile Number</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="altMobileNumber"
                  placeholder="Alt Mobile Number"
                  onChange={handleInputChange}
                />
                <label>Alt Mobile Number</label>
              </div>
              <button onClick={handleSignup}>Signup</button>
            </form>
            <div className="bottom-link">
              Already have an account?
              <a href="/login" id="login-link">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
