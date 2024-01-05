// controllers/buyerController.js
const Buyer = require('../models/Buyer');

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
            // Save Aadhar card
            if (req.files.aadhar) {
                const aadhar = req.files.aadhar[0];
                buyer.documents.aadhar = aadhar.location || aadhar.path; // Assuming file.location for AWS S3 or file.path for local storage
            }

            // Save PAN card
            if (req.files.panCard) {
                const panCard = req.files.panCard[0];
                buyer.documents.panCard = panCard.location || panCard.path;
            }

            // Save Address Bill
            if (req.files.addressBill) {
                const addressBill = req.files.addressBill[0];
                buyer.documents.addressBill = addressBill.location || addressBill.path;
            }

            // Save Photo
            if (req.files.photo) {
                const photo = req.files.photo[0];
                buyer.documents.photo = photo.location || photo.path;
            }

            // Save Visiting Card
            if (req.files.visitingCard) {
                const visitingCard = req.files.visitingCard[0];
                buyer.documents.visitingCard = visitingCard.location || visitingCard.path;
            }

            // Save Shop Photos
            if (req.files.shopPhotosInside) {
                const insidePhoto = req.files.shopPhotosInside[0];
                buyer.documents.shopPhotos.inside = insidePhoto.location || insidePhoto.path;
            }

            if (req.files.shopPhotosOutside) {
                const outsidePhoto = req.files.shopPhotosOutside[0];
                buyer.documents.shopPhotos.outside = outsidePhoto.location || outsidePhoto.path;
            }
        }

        // Save the updated buyer model
        await buyer.save();

        res.status(200).json({ message: 'Documents uploaded successfully' });
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ message: 'Internal Server Error from buyer controller' });
    }
};
