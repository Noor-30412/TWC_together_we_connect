// controllers/sellerController.js
const Seller = require('../models/Seller');

// Endpoint to handle document uploads
exports.uploadDocuments = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const seller = await Seller.findOne({ userId: req.userId });

        // Check if the seller exists
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Process uploaded files
        if (req.files) {
            // Save Aadhar card
            if (req.files.aadhar) {
                const aadhar = req.files.aadhar[0];
                seller.documents.aadhar = aadhar.location || aadhar.path; // Assuming file.location for AWS S3 or file.path for local storage
            }

            // Save PAN card
            if (req.files.panCard) {
                const panCard = req.files.panCard[0];
                seller.documents.panCard = panCard.location || panCard.path;
            }

            // Save Address Bill
            if (req.files.addressBill) {
                const addressBill = req.files.addressBill[0];
                seller.documents.addressBill = addressBill.location || addressBill.path;
            }

            // Save Photo
            if (req.files.photo) {
                const photo = req.files.photo[0];
                seller.documents.photo = photo.location || photo.path;
            }

            // Save Visiting Card
            if (req.files.visitingCard) {
                const visitingCard = req.files.visitingCard[0];
                seller.documents.visitingCard = visitingCard.location || visitingCard.path;
            }

            // Save Shop Photos
            if (req.files.shopPhotosInside) {
                const insidePhoto = req.files.shopPhotosInside[0];
                seller.documents.shopPhotos.inside = insidePhoto.location || insidePhoto.path;
            }

            if (req.files.shopPhotosOutside) {
                const outsidePhoto = req.files.shopPhotosOutside[0];
                seller.documents.shopPhotos.outside = outsidePhoto.location || outsidePhoto.path;
            }
        }

        // Save the updated seller model
        await seller.save();

        res.status(200).json({ message: 'Documents uploaded successfully' });
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ message: 'Internal Server Error from seller controller' });
    }
};

// Add other seller controller functions as needed
