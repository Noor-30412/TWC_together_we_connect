// // backend/routings/emailVerificationRoutes.js
// const express = require('express');
// const router = express.Router();
// const nodemailer = require('../utils/nodemailer');

// router.post('/send-verification-email', async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Generate a unique verification token (you might want to use a library for this)
//         const verificationToken = generateUniqueToken();

//         // Save the verification token in the user's record in the database (you might need to enhance your User model)

//         // Send the verification email
//         const mailOptions = {
//             from: 'togetherweconnect.04@gmail.com',
//             to: email,
//             subject: 'Verify Your Email',
//             html: `<p>Click the following link to verify your email: <a href="http://your-app-url/verify-email/${verificationToken}">Verify Email</a></p>`,
//         };

//         await nodemailer.sendMail(mailOptions);

//         res.status(200).json({ message: 'Verification email sent successfully' });
//     } catch (error) {
//         console.error('Error sending verification email:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// router.post('/verify-email', async (req, res) => {
//     try {
//         const { email, verificationToken } = req.body;

//         // Retrieve the saved verification token from the user's record in the database

//         // Compare the entered token
//         if (verificationToken !== savedVerificationToken) {
//             return res.status(401).json({ message: 'Invalid verification token' });
//         }

//         // If the token is valid, mark the user as verified (you might need to enhance your User model)

//         res.status(200).json({ message: 'Email verified successfully' });
//     } catch (error) {
//         console.error('Error verifying email:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// module.exports = router;
