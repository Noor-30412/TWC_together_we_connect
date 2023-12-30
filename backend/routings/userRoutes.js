const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('validator');

router.post('/register', async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password, 
            firstName, 
            lastName, 
            mobileNumber, 
            altMobileNumber, 
            dateOfBirth,  // Assuming dateOfBirth is a new field
            address  // Assuming address is a new field
        } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Validate mobile number
        if (!/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).json({ message: 'Mobile Number must have exactly 10 digits' });
        }

        // Validate date of birth (example validation)
        if (!validator.isISO8601(dateOfBirth)) {
            return res.status(400).json({ message: 'Invalid date of birth format' });
        }

        // Additional validations for other fields can be added here

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already taken' });
        }

        const newUser = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            mobileNumber,
            altMobileNumber,
            dateOfBirth,
            address,
            isVerified: false
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send verification email (uncomment and complete this section if needed)
        /*
        const verificationLink = ${process.env.FRONTEND_URL}/verify?token=${token};
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Verify Your Email',
            html: Click <a href="${verificationLink}">here</a> to verify your email.,
        };

        await transporter.sendMail(mailOptions);
        */

        res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
        console.error('Error during registration:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error. Please check your input.' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
