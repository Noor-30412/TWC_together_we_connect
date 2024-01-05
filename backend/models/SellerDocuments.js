// models/SellerDocuments.js
const mongoose = require('mongoose');

const sellerDocumentsSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    aadhar: String,
    panCard: String,
    addressBill: String,
    photo: String,
    visitingCard: String,
    shopPhotos: {
        inside: String,
        outside: String,
    },
    // Add other document fields as needed
});

const SellerDocuments = mongoose.model('SellerDocuments', sellerDocumentsSchema);

module.exports = SellerDocuments;
