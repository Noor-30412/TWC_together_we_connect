// Assuming you're using the same logic in your user registration route
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email is already taken
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already taken' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generate a JWT for the newly registered user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Registration successful', token, userId: newUser._id });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;