const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopName: { type: String, required: true, maxlength: 100 },
  shippingAddress: {
    pincode: { type: String, required: true, match: /^\d{6}$/ },
    location: { type: String },
    city: { type: String },
    landmark: { type: String },
  },
  establishmentYears: { type: Number, required: true, min: 1 },
  altMobileNumber: { type: String, required: true, match: /^\d{10}$/ },
  interestedItems: { type: String, required: true },
  
  whatsappNumber: { type: String, required: true, match: /^\d{10}$/ },
  gstNumber: {
    type: String,
    required: true,
    match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[A-Z\d]{1}$/,
  },
  estimatedAnnualIncome: { type: String }, // You can add specific validation for this field if needed
  termsAndConditions: { type: Boolean, required: true },// Assuming it will be a checkbox (true/false)
});

// Custom validation for interestedItems
buyerSchema.path('interestedItems').validate((value) => {
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

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
