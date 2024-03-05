import React, { useState } from 'react';
import '../styles/welcome.css';

const WelcomeForm = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the email to the server
        try {
            const response = await fetch('/admin/welcome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senderEmail: email }), // Include senderEmail in the request body
            });
            if (response.ok) {
                console.log('Welcome email sent successfully!');
                setEmailSent(true);
                setTimeout(() => {
                    setEmailSent(false);
                }, 3000); // Reset emailSent after 3 seconds
            } else {
                console.error('Failed to send welcome email');
            }
        } catch (error) {
            console.error('Error sending welcome email:', error);
        }
        // Clear the email field
        setEmail('');
    };

    return (
        <div className={`container ${emailSent ? 'success' : ''}`}>
            {emailSent && <div className="ribbon">Email Sent!</div>}
            <form onSubmit={handleSubmit}>
                <h2>Welcome Mail</h2>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">
                    Send Welcome Mail
                </button>
            </form>
        </div>
    );
};

export default WelcomeForm;
