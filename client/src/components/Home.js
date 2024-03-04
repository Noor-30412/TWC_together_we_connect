import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import '../styles/home.css';

const Home = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const switchToBuyerRegistration = () => {
        navigate('/register-buyer');
    };

    const switchToSellerRegistration = () => {
        navigate('/register-seller');
    };

    return (
        <div className="home-container">
            <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={handleLogout}
                switchToBuyerRegistration={switchToBuyerRegistration}
                switchToSellerRegistration={switchToSellerRegistration}
            />

            <div className="banner-margin">
                <h1>Welcome to Our Ecommerce Website {isAuthenticated ? user.username : 'Guest'}!</h1>
                <p>Discover great deals on various products.</p>
            </div>

            <div className="product-categories">
                <h2>Product Categories</h2>
                <ul>
                    <li>
                        <Link to="/category/electronics">Electronics</Link>
                    </li>
                    <li>
                        <Link to="/category/fashion">Fashion</Link>
                    </li>
                    <li>
                        <Link to="/category/home-appliances">Home Appliances</Link>
                    </li>
                    {/* Add more categories as needed */}
                </ul>
            </div>

            <div className="featured-products">
                <h2>Featured Products</h2>
                {/* Render featured products here */}
            </div>

            <div className="shopping-cart-preview">
                <h2>Shopping Cart</h2>
                {/* Render shopping cart preview here */}
            </div>

            {/* <div className="newsletter-signup">
                <h2>Sign Up for Our Newsletter</h2>
                <form>
                    <input type="email" placeholder="Enter your email" />
                    <button type="submit">Sign Up</button>
                </form>
            </div> */}
        </div>
    );
};

export default Home;
