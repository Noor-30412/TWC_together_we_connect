const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Seller = require('../models/Seller');
const SellerDocuments = require('../models/SellerDocuments');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/upload');
const mimeTypes = require('mime-types');
const fs = require('fs').promises; // Import the fs.promises module

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

            let sellerDocuments = await SellerDocuments.findOne({ sellerId: seller._id });
            if (!sellerDocuments) {
                sellerDocuments = new SellerDocuments({ sellerId: seller._id });
            }

            // Define allowed mime types for each document type
            const allowedAadharFormats = ['image/jpeg', 'image/png'];
            const allowedPanCardFormats = ['image/jpeg', 'image/png'];
            const allowedAddressBillFormats = ['image/jpeg', 'image/png', 'application/pdf'];
            const allowedPhotoFormats = ['image/jpeg', 'image/png'];
            const allowedVisitingCardFormats = ['application/pdf']; // Assuming visiting card is always PDF
            const allowedInsidePhotoFormats = ['image/jpeg', 'image/png', 'application/pdf'];
            const allowedOutsidePhotoFormats = ['image/jpeg', 'image/png', 'application/pdf'];
            // Add other document types

            sellerDocuments.documents = {
                aadhar: validateAndSaveFile(req.files['aadhar'][0], 'aadhar', allowedAadharFormats),
                panCard: validateAndSaveFile(req.files['panCard'][0], 'panCard', allowedPanCardFormats),
                addressBill: validateAndSaveFile(req.files['addressBill'][0], 'addressBill', allowedAddressBillFormats),
                photo: validateAndSaveFile(req.files['photo'][0], 'photo', allowedPhotoFormats),
                visitingCard: req.files['visitingCard'] ? validateAndSaveFile(req.files['visitingCard'][0], 'visitingCard', allowedVisitingCardFormats, true) : undefined,
                shopPhotos: {
                    inside: validateAndSaveFile(req.files['shopPhotosInside'][0], 'inside', allowedInsidePhotoFormats),
                    outside: validateAndSaveFile(req.files['shopPhotosOutside'][0], 'outside', allowedOutsidePhotoFormats),
                },
                // Add other document types
            };

            if (areAllDocumentsUploaded(sellerDocuments.documents)) {
                await sellerDocuments.save();
                res.status(200).json({ message: 'Documents uploaded successfully' });
            } else {
                // Delete the uploaded files if not all documents are uploaded
                await deleteUploadedFiles(req.files);
                console.error('All required documents must be uploaded');
                res.status(400).json({ message: 'All required documents must be uploaded' });
            }
        } catch (error) {
            console.error('Document upload error:', error);
            // Delete the uploaded files in case of an error
            if (req.files) {
                await deleteUploadedFiles(req.files);
            }
            console.error('Internal Server Error from sellerDocumentRoutes');
            res.status(500).json({ message: 'Internal Server Error from sellerDocumentRoutes' });
        }
    }
);

// ... (other routes and functions)

async function deleteUploadedFiles(files) {
    // Iterate through the uploaded files and delete them
    for (const fieldName in files) {
        for (const file of files[fieldName]) {
            await fs.unlink(file.path);
        }
    }
}

function validateAndSaveFile(file, fieldName, allowedMimeTypes, isOptional = false) {
    if (!isOptional && (!file || !file.path)) {
        console.error(`Missing required file: ${fieldName}`);
        throw new Error(`Missing required file: ${fieldName}`);
    }

    const detectedMimeType = mimeTypes.lookup(file.path);

    if (!allowedMimeTypes.includes(detectedMimeType)) {
        console.error(`Invalid ${fieldName} format. Detected: ${detectedMimeType}. Allowed: ${allowedMimeTypes.join(', ')}`);
        throw new Error(`Invalid ${fieldName} format. Detected: ${detectedMimeType}. Allowed: ${allowedMimeTypes.join(', ')}`);
    }

    return file.location || file.path;
}

function areAllDocumentsUploaded(documents) {
    // Check if all required fields are not empty
    return (
        documents.aadhar &&
        documents.panCard &&
        documents.addressBill &&
        documents.photo &&
        (documents.visitingCard || true) && // Visiting card is optional
        documents.shopPhotos.inside &&
        documents.shopPhotos.outside
        // Add other document types
    );
}

module.exports = router;
