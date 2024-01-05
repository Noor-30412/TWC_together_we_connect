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
<<<<<<< HEAD
                 <Navbar   isAuthenticated={isAuthenticated} />

=======
        
        
>>>>>>> 809db6227d330d2b2182f728a8471df21cc3dbc7
            <h2>{isAuthenticated ? `Welcome ${user.username}` : 'Welcome Guest'}</h2>
            
            
        </div>
    );
};

export default Home;
