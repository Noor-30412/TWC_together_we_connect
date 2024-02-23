import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';

const backgroundImages = [
  'https://source.unsplash.com/random/1920x1080/?nature,water',
  'https://source.unsplash.com/random/1920x1080/?nature,mountains',
  'https://source.unsplash.com/random/1920x1080/?nature,forest',
  'https://source.unsplash.com/random/1920x1080/?nature,beach',
  'https://source.unsplash.com/random/1920x1080/?nature,sky',
];

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
    <div className="Auth-form-container" style={{ backgroundImage: `url(${backgroundImages[0]})` }}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <div className="form-group">
            <div className="signup">
              <div className="form-details">
                <h2 className='text-black'>Create an Account</h2>
                <p className='text-black'>Join us by creating your account and start exploring our services.</p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mobileNumber"
              className="form-control"
              placeholder="Mobile Number"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="altMobileNumber"
              className="form-control"
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
  );
};

export default Signup;
