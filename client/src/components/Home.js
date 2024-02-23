// Home.js
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import '../styles/home.css'

const Home = () => {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const switchToBuyerRegistration = () => {
        navigate('/register-buyer')
    }

    const switchToSellerRegistration = () => {
        navigate('/register-seller')
    }

    return (
        <div className="home-container">
            <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={handleLogout}
                switchToBuyerRegistration={switchToBuyerRegistration}
                switchToSellerRegistration={switchToSellerRegistration}
            />
            <h2 className="welcome-message">
                {isAuthenticated ? `Welcome, ${user.username}` : 'Welcome Guest'}
            </h2>
        </div>
    )
}

export default Home