// models/Buyer.js
const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopName: { type: String, required: true },
    shippingAddress: {
        pincode: String,
        location: String,
        city: String,
        landmark: String,
    },
    establishmentYears: String,
    altMobileNumber: String,
    interestedItems: String,
    termsAndConditions: String, // have to change to checkbox as true or false later
    whatsappNumber: String,
    gstNumber: String,
    estimatedAnnualIncome: String,
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
