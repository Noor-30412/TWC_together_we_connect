// In your Home component
import React from 'react';
import { useAuth } from '../context/AuthContext';

// Home.js
const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div>
            <h2>{isAuthenticated ? `Welcome ${user.username}` : 'Welcome Guest'}</h2>
        </div>
    );
};


export default Home;
