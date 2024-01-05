// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/signup.css';

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
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
          
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="form-group mt-3">
            <div className="signup">
        <div className="form-details">
            <h2>Create an Account</h2>
            <p>Join us by creating your account and start exploring our services.</p>
            </div>
            </div>
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                name="username"
                placeholder="Username"
                onChange={handleInputChange}
              />
           

           
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Email"
                onChange={handleInputChange}
              />
           
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={handleInputChange}
              />
          
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control mt-1"
                placeholder="First Name"
                onChange={handleInputChange}
              />
           
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control mt-1"
                placeholder="Last Name"
                onChange={handleInputChange}
              />
           
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                className="form-control mt-1"
                placeholder="Mobile Number"
                onChange={handleInputChange}
              />
            
              <label>Alt Mobile Number</label>
              <input
                type="text"
                name="altMobileNumber"
                className="form-control mt-1"
                placeholder="Alt Mobile Number"
                onChange={handleInputChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" onClick={handleSignup} className="btn btn-primary">
                Signup
              </button>
            </div>
            <div className="text-center mt-3">
              Already have an account?
              <a href="/login" id="login-link">
                Log In
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
