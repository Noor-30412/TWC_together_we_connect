const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const Seller = require('../models/Seller')

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
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
    } = req.body

    const existingSeller = await Seller.findOne({ shopName, altMobileNumber, whatsappNumber })

    if (existingSeller) {
      return res.status(400).json({ message: 'Your shop is already registered.' })
    }

    const seller = new Seller({
      userId: req.user._id,
      shopName,
      typeOfItemsSold,
      descriptionOfItemsSold,
      establishmentYears,
      altMobileNumber,
      address,
      whatsappNumber,
      gstNumber,
      estimatedAnnualIncome,
    })

    // Save the seller instance to the database
    await seller.save()

    res.status(201).json({ message: 'Seller registration successful', sellerId: seller._id })
  } catch (error) {
    console.error('Error during seller registration:', error)
    res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
})

module.exports = router