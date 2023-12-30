import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [loginData, setLoginData] = useState({
        identifier: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', loginData);
            const { token, userId, username } = response.data;
            console.log('User logged in:', username);
            login({ token, userId, username });
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error.response?.data?.message);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during login');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input
                type="text"
                name="identifier"
                placeholder="Username or email"
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
