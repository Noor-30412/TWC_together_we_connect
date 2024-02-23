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

    const handleRegisterSeller = () => {
        navigate('/register-seller')
    }

    const handleRegisterBuyer = () => {
        navigate('/register-buyer')
    }

    const renderAuthButtons = () => {
        if (isAuthenticated) {
            return (
                <div className="auth-buttons">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )
        }
    }

    return (
        <div className="home-container">
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <h2 className="welcome-message">
                {isAuthenticated ? `Welcome, ${user.username}` : 'Welcome Guest'}
            </h2>
            {isAuthenticated && (
                <div className="seller-buyer-buttons">
                    <button onClick={handleRegisterSeller}>Register seller shop</button>
                    <button onClick={handleRegisterBuyer}>Register buyer shop</button>
                </div>
            )}
            {renderAuthButtons()}
        </div>
    )
}

export default Home