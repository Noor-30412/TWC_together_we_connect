// models/BuyerDocuments.js
const mongoose = require('mongoose');


const buyerDocumentsSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
    aadhar: String,
    panCard: String,
    addressBill: String,
    photo: String,
    visitingCard: String,
    shopPhotos: {
        inside: String,
        outside: String,
    },
});

const BuyerDocuments = mongoose.model('BuyerDocuments', buyerDocumentsSchema);

module.exports = BuyerDocuments;
