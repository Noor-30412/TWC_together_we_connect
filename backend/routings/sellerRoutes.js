// backend/routes/sellerRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Seller = require('../models/Seller');

// Seller registration route
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const {
      shopName,
      typeOfItemsSold,
      descriptionOfItemsSold,
      establishmentYears,
      altMobileNumber,
      address,
      interestedItems,
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
    } = req.body;

    const seller = new Seller({
      userId: req.user._id,
      shopName,
      typeOfItemsSold,
      descriptionOfItemsSold,
      establishmentYears,
      altMobileNumber,
      address,
      interestedItems,
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
    });

    res.status(201).json({ message: 'Seller registration successful', sellerId: seller._id });
  } catch (error) {
    console.error('Error during seller registration:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
  
});

module.exports = router;
