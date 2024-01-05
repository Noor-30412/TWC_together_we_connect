// components/buyerDocumentRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Buyer = require('../models/Buyer');
const BuyerDocuments = require('../models/BuyerDocuments');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/upload');

// Endpoint for document uploads
router.post(
    '/upload-documents',
    authMiddleware,
    uploadMiddleware.fields([
        { name: 'aadhar', maxCount: 1 },
        { name: 'panCard', maxCount: 1 },
        { name: 'addressBill', maxCount: 1 },
        { name: 'photo', maxCount: 1 },
        { name: 'visitingCard', maxCount: 1 },
        { name: 'shopPhotosInside', maxCount: 1 },
        { name: 'shopPhotosOutside', maxCount: 1 },
        // Add other document types
    ]),
    async (req, res) => {
        try {
            // Check if the user has a buyer profile
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if the buyer profile exists
            const buyer = await Buyer.findOne({ userId: user._id });
            if (!buyer) {
                return res.status(404).json({ message: 'Buyer profile not found' });
            }

            // Update or create the buyer documents
            let buyerDocuments = await BuyerDocuments.findOne({ buyerId: buyer._id });
            if (!buyerDocuments) {
                buyerDocuments = new BuyerDocuments({ buyerId: buyer._id });
            }

            // Update buyer's documents field with file paths
            buyerDocuments.documents = {
                aadhar: req.files['aadhar'][0].path,
                panCard: req.files['panCard'][0].path,
                addressBill: req.files['addressBill'][0].path,
                photo: req.files['photo'][0].path,
                visitingCard: req.files['visitingCard'][0].path,
                shopPhotos: {
                    inside: req.files['shopPhotosInside'][0].path,
                    outside: req.files['shopPhotosOutside'][0].path,
                },
            };

            await buyerDocuments.save();

            res.status(200).json({ message: 'Documents uploaded successfully' });
        } catch (error) {
            console.error('Document upload error:', error);
            res.status(500).json({ message: 'Internal Server Error from buyerDocumentRoutes' });
        }
    }
);

// ... other routes

module.exports = router;
