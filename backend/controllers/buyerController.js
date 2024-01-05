// controllers/buyerController.js
const Buyer = require('../models/Buyer');
const mimeTypes = require('mime-types');

// Function to check if all required documents are uploaded
function areAllDocumentsUploaded(documents) {
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

// Function to validate and save a specific document field
function validateAndSaveFile(file, fieldName, target, allowedMimeTypes, isOptional = false) {
    // Check if the file is provided for required fields
    if (!isOptional && (!file || !file.path)) {
        throw new Error(`Missing required file: ${fieldName}`);
    }

    // Add additional validations here, e.g., file format checks
    const detectedMimeType = mimeTypes.lookup(file.path);
    if (!allowedMimeTypes.includes(detectedMimeType)) {
        throw new Error(`Invalid ${fieldName} format. Detected: ${detectedMimeType}. Allowed: ${allowedMimeTypes.join(', ')}`);
    }

    // Save the file path to the target object
    target[fieldName] = file.location || file.path;
}

// Endpoint to handle document uploads
exports.uploadDocuments = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const buyer = await Buyer.findOne({ userId: req.userId });

        // Check if the buyer exists
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        // Process uploaded files
        if (req.files) {
            // Save each document type individually

            // Save Aadhar card
            if (req.files.aadhar) {
                validateAndSaveFile(req.files.aadhar[0], 'aadhar', buyer.documents, ['image/jpeg', 'image/png']);
            }

            // Save PAN card
            if (req.files.panCard) {
                validateAndSaveFile(req.files.panCard[0], 'panCard', buyer.documents, ['image/jpeg', 'image/png']);
            }

            // Save Address Bill
            if (req.files.addressBill) {
                validateAndSaveFile(req.files.addressBill[0], 'addressBill', buyer.documents, ['image/jpeg', 'image/png', 'application/pdf']);
            }

            // Save Photo
            if (req.files.photo) {
                validateAndSaveFile(req.files.photo[0], 'photo', buyer.documents, ['image/jpeg', 'image/png']);
            }

            // Save Visiting Card (optional)
            if (req.files.visitingCard) {
                validateAndSaveFile(req.files.visitingCard[0], 'visitingCard', buyer.documents, ['application/pdf'], true);
            }

            // Save Shop Photos
            if (req.files.shopPhotosInside) {
                validateAndSaveFile(req.files.shopPhotosInside[0], 'inside', buyer.documents.shopPhotos, ['image/jpeg', 'image/png', 'application/pdf']);
            }

            if (req.files.shopPhotosOutside) {
                validateAndSaveFile(req.files.shopPhotosOutside[0], 'outside', buyer.documents.shopPhotos, ['image/jpeg', 'image/png', 'application/pdf']);
            }
        }

        // Check if all required documents are uploaded
        if (areAllDocumentsUploaded(buyer.documents)) {
            // Save the updated buyer model
            await buyer.save();
            res.status(200).json({ message: 'Documents uploaded successfully' });
        } else {
            res.status(400).json({ message: 'All required documents must be uploaded' });
        }
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ message: 'Internal Server Error from buyer controller', error: error.message });
    }
};
