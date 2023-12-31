// Home.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/home'); // Redirect to home page after logout
    };

    const renderAuthButtons = () => {
        if (isAuthenticated) {
            return (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to="/register-buyer">Register Buyer Shop</Link>
                    <Link to="/register-seller">Register Seller Shop</Link>
                </>
            );
        } else {
            return (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            );
        }
    };

    return (
        <div>
            <h2>{isAuthenticated ? `Welcome ${user.username}` : 'Welcome Guest'}</h2>
            {renderAuthButtons()}
        </div>
    );
};

export default Home;
