const express = require('express');
const router = express.Router();
const { createWelcomeMail } = require('../controllers/welcomeMailController');
//const uploads = require('../middleware/uploads');

router.post('/welcome', createWelcomeMail);

module.exports = router;