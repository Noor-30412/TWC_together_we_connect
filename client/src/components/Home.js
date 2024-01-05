// Home.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const Home = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/home'); // Redirect to home page after logout
    };
    const handleregisterseller = () => {
        navigate('/register-seller');
        
    };
    const handleregisterbuyer = () => {
        navigate('/register-buyer');
        
    };
    /*const renderAuthButtons = () => {
        if (isAuthenticated) {
            return (
                <>
                    <button onClick={handleLogout}>Logout</button><br></br>
                    <button onClick={handleregisterseller}>Register seller shop</button><br></br>
                    <button onClick={handleregisterbuyer}>Register buyer shop</button><br></br>
                    
                </>
            );
        } else {
            return (
                <>
                   
                </>
            );
        }
    };*/

    return (
        <div>
                 <Navbar   isAuthenticated={isAuthenticated} />

            <h2>{isAuthenticated ? `Welcome ${user.username}` : 'Welcome Guest'}</h2>
            
            
        </div>
    );
};

export default Home;
