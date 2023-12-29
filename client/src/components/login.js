// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', loginData);
            const user = response.data; // Log this user object
            console.log('User:', user);
            login(user);
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
