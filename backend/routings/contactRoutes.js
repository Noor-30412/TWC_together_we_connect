const express = require('express');
const router = express.Router();
const { createContactUs } = require('../controllers/contactUscontroller');
const uploads = require('../middleware/uploads');

router.post('/contact-us', uploads, createContactUs);

module.exports = router;