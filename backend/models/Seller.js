const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  shopName: { type: String, required: true, maxlength: 100, unique: true },
  typeOfItemsSold: { type: String, required: true, maxlength: 255 },
  descriptionOfItemsSold: { type: String, required: true },
  establishmentYears: { type: Number, required: true, min: 1 },
  altMobileNumber: { type: String, required: true, match: /^\d{10}$/, unique: true },
  address: {
    pincode: { type: String, required: true, match: /^\d{6}$/ },
    location: { type: String },
    city: { type: String },
    landmark: { type: String },
  },
  whatsappNumber: { type: String, required: true, match: /^\d{10}$/, unique: true },
  gstNumber: {
    type: String,
    required: true,
    match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[A-Z\d]{1}$/,
  },
  estimatedAnnualIncome: { type: Number, required: true, min: 0 },
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;