const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Seller = require('../models/Seller'); // Assuming you have a Seller model defined

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
      userId: req.user._id, // Assuming you have a user object in the request (from authentication middleware)
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

    await seller.save();

    res.status(201).json({ message: 'Seller registration successful', sellerId: seller._id });
  } catch (error) {
    console.error('Error during seller registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
