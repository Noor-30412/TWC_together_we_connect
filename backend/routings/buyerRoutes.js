// routes/buyerRoutes.js
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
      termsAndConditions,
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
    } = req.body;

    const buyer = new Buyer({
      userId: req.user._id, // Assuming you have a user object in the request (from authentication middleware)
      shopName,
      shippingAddress,
      establishmentYears,
      altMobileNumber,
      interestedItems,
      termsAndConditions,
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
    });

    await buyer.save();

    res.status(201).json({ message: 'Buyer registration successful', buyerId: buyer._id });
  } catch (error) {
    console.error('Error during buyer registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
