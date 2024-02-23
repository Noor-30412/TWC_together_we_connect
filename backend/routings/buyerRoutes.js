const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Buyer = require('../models/Buyer');

// Buyer registration route
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const {
      shopName,
      shippingAddress,
      establishmentYears,
      altMobileNumber,
      interestedItems,
      
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
      termsAndConditions,
    } = req.body;

    // Check if a buyer with the same user ID already exists
    const existingBuyer = await Buyer.findOne({ userId: req.user._id });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Buyer account already exists' });
    }

    // Create a new buyer instance
    const buyer = new Buyer({
      userId: req.user._id,
      shopName,
      shippingAddress,
      establishmentYears,
      altMobileNumber,
      interestedItems,
      
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
      termsAndConditions,
    });

    // Save the buyer to the database
    await buyer.save();

    res.status(201).json({ message: 'Buyer registration successful', buyerId: buyer._id });
  } catch (error) {
    console.error('Error during buyer registration:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
