import React, { useState } from 'react';
import '../styles/navbar.css';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated, islog, logout } = useAuth();
  const navigate = useNavigate();

  const switchToBuyerRegistration = () => {
    navigate('/register-buyer');
  };

  const switchToSellerRegistration = () => {
    navigate('/register-seller');
  };

  const handleClick = (page) => {
    setClicked(!clicked);
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/home');
  };

  return (
    <nav>
      <a href="index.html">
        <svg
          id="logo-35"
          width="50"
          height="39"
          viewBox="0 0 50 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            className="ccompli1"
            fill="#007AFF"
          ></path>{' '}
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            className="ccustom"
            fill="#312ECB"
          ></path>{' '}
        </svg>
      </a>
      <div>
        <ul id="navbar" className={clicked ? 'active' : ''}>
          <li className={currentPage === 'home' ? 'active' : 'inactive'} onClick={() => handleClick('home')}>
            <Link to="/home">Home</Link>
          </li>
          <li className={currentPage === 'about' ? 'active' : 'inactive'} onClick={() => handleClick('about')}>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="index.html">Contact Us</Link>
          </li>
          <li>
            <Link to="index.html">Product</Link>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            {islog ? (
              <>
                <div className="dropdown">
                  <a className="dropbtn">Register Shop</a>
                  <div className="dropdown-content">
                    <a onClick={switchToBuyerRegistration}>Register as Buyer</a>
                    <a onClick={switchToSellerRegistration}>Register as Seller</a>
                  </div>
                </div>
                <Link to="/home" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <li>
                <Link to="/login">Login/Signup</Link>
              </li>
            )}
          </li>
        </ul>
      </div>
      <div id="mobile" onClick={() => setClicked(!clicked)}>
        <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
    </nav>
  );
};

export default Navbar;
