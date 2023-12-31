// models/Seller.js
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopName: { type: String, required: true },
    typeOfItemsSold: String,
    descriptionOfItemsSold: String,
    establishmentYears: String,
    altMobileNumber: String,
    address: {
        pincode: String,
        location: String,
        city: String,
        landmark: String,
    },
    interestedItems: String,
    whatsappNumber: String,
    gstNumber: String,
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
