const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
//const transporter = require('../utils/nodemailer'); // Import the nodemailer configuration

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email is already taken
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already taken' });
        }

        // Create a new user with 'isVerified' set to false
        const newUser = new User({ username, email, password, isVerified: false });
        await newUser.save();

        // Generate a JWT for the newly registered user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send verification email (uncomment and complete this section if needed)
        /*
        const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Verify Your Email',
            html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
        };

        await transporter.sendMail(mailOptions);
        */

        res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
        console.error('Error during registration:', error);

        // Provide more specific error messages based on the type of error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error. Please check your input.' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
