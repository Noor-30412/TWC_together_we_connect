// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

import Login from './components/login';
import About from './components/About'; // Import the About component
import RegisterBuyer from './components/Buyer';
import RegisterSeller from './components/Seller';
import Signup from './components/signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register-buyer" element={<RegisterBuyer />} />
      <Route path="/register-seller" element={<RegisterSeller />} />
    </Routes>
  );
};

export default AppRoutes;