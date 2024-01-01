import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

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
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/login', loginData);
            const { token, userId, username } = response.data;
            console.log('User logged in:', username);
            login({ token, userId, username });
            localStorage.setItem('token', response.data.token);
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
        <>
            <div className='container'>
            <div className="form-box ">
                
                <div className="form-content">
                <h2>Welcome Back</h2>
                    <p>Please log in using your personal information to stay connected with us.</p>
                    <form onSubmit={handleLogin}>
                        <div className="input-field">
                            <input
                                type="text"
                                required
                                value={loginData.identifier}
                                onChange={handleInputChange}
                                name="identifier"
                                placeholder="Email"
                            />
                            
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                required
                                value={loginData.password}
                                onChange={handleInputChange}
                                name="password"
                                placeholder="Password"
                            />
                            
                        </div>
                        
                        <button type="submit">Log In</button>

                        <a href="#" className="forgot-pass-link">
                            Forgot password?
                        </a>
                    </form>
                    <div className="bottom-link">
                        Don't have an account?
                        <a href="/signup">
                            Create Here.
                        </a>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Login;
