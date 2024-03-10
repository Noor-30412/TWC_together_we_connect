const express = require('express');
const router = express.Router();
const Product = require('../models/AddProducts');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/upload');
const User = require('../models/User'); // Import User model
const Seller = require('../models/Seller'); // Import Seller model

// POST route to add a new product
router.post('/add-product', authMiddleware, uploadMiddleware.array('images', 6), async (req, res) => {
    try {
        // Retrieve user and seller details
        const user = await User.findById(req.user._id);
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const seller = await Seller.findOne({ userId: user._id });
        if (!seller) {
            console.error('Seller profile not found');
            return res.status(404).json({ message: 'Seller profile not found' });
        }

        // Extract product details from request body
        const {
            name,
            description,
            price,
            category,
            stock,
            availability,
            brand,
            discount,
            color,
            size,
            weight,
            length,
            width,
            height
        } = req.body;

        // Construct dimensions object
        const dimensions = { length, width, height };

        // Construct images array with uploaded file paths
        const images = req.files.map(file => file.path);

        // Create new product
        const product = new Product({
            sellerId: seller._id, // Use seller's ID
            userId: user._id, // Use user's ID
            name,
            description,
            price,
            category,
            images,
            stock,
            availability,
            brand,
            discount,
            color,
            size,
            weight,
            dimensions
        });

        // Save product to database
        await product.save();

        // Return success response
        return res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
