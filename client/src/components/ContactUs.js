import React, { useState } from 'react';
import '../styles/contactus.css';
import Navbar from '../components/navbar';
import axios from 'axios'; // Import axios for making HTTP requests

// Define the background image URL
const backgroundImageUrl = 'https://images.unsplash.com/photo-1624137308703-e1da1ca881df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const ContactUs = () => {
    // State variables to store form data
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Define handleSubmit function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send form data to the backend
            const response = await axios.post('/api/contact/contact-us', {
                senderEmail: email,
                category,
                description: message
            });

            // Display success message if request is successful
            setSuccessMessage(response.data.message);
        } catch (error) {
            // Display error message if there's an error
            setErrorMessage('Error submitting the form. Please try again later.');
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            {/* Add viewport meta tag */}
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <div className="contact-page" style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'scroll', minHeight: '100vh' }}>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions, feedback, or inquiries, feel free to contact us using the form below.
                    </p>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" id="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <br />
                        <select id="category" name="category" required value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Support">Support</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <br />
                        <textarea id="message" name="message" rows="4" placeholder="Enter Message Here" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button type="submit">Submit</button>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
