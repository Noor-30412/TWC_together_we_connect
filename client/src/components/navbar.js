// Navbar.js

import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <header>
            <nav>
                <div className="logo"><img src="" alt="Logo" /></div>
                <ul className="nav-links">
                    <li><a href="/home">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Product</a></li>
                    <li><a href="/login">Login/Signup</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
