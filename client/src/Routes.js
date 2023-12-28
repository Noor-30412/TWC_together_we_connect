// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/signUp';
import Login from './components/login';
//import VerifyEmail from './components/verifyEmail';
import About from './components/About'; // Import the About component

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* Add a route for the About component */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/verify/:token" element={<VerifyEmail />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
