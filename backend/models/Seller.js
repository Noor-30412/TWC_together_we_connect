// models/Seller.js
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopName: { type: String, required: true, maxlength: 100 },
  typeOfItemsSold: { type: String, required: true, maxlength: 255 },
  descriptionOfItemsSold: { type: String, required: true },
  establishmentYears: { type: Number, required: true, min: 1 },
  altMobileNumber: { type: String, required: true, match: /^\d{10}$/ },
  address: {
    pincode: { type: String, required: true, match: /^\d{6}$/ },
    location: { type: String },
    city: { type: String },
    landmark: { type: String },
  },
  interestedItems: { type: String, required: true },
  whatsappNumber: { type: String, required: true, match: /^\d{10}$/ },
  gstNumber: {
    type: String,
    required: true,
    match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[A-Z\d]{1}$/,
  },
});

// Custom validation for interestedItems
sellerSchema.path('interestedItems').validate((value) => {
  const commonInterestedItems = [
    'Electronics',
    'Clothing',
    'Home Appliances',
    'Books',
    'Toys',
    'Furniture',
    'Sporting Goods',
    'Jewelry',
    'Beauty Products',
    'Automotive Parts',
  ];

  return commonInterestedItems.includes(value);
}, 'Invalid Interested Item');

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
