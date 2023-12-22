// backend/routings/protectedRoutes.js (or a new file for protected routes)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

module.exports = router;
