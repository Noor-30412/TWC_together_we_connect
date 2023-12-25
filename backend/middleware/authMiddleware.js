// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded user:', decoded);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }

        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
