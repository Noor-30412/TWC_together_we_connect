// components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

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
      <h2>Signup</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="mobileNumber"
        placeholder="Mobile Number"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="altMobileNumber"
        placeholder="Alt Mobile Number"
        onChange={handleInputChange}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
