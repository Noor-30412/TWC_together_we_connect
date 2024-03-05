import React, { useState } from 'react';
import '../styles/contactus.css';
import Navbar from '../components/navbar';
import axios from 'axios'; // Import axios for making HTTP requests

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
            <div className="contact-page">
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
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default ContactUs;