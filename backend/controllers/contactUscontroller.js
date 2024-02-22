const ContactUs = require('../models/ContactUs');
const nodemailer = require('nodemailer');

exports.createContactUs = async (req, res) => {
    try {
        const { senderEmail, category, description } = req.body;

        const contactUs = new ContactUs({
            senderEmail,
            category,
            description
        });

        await contactUs.save();

        // Send email to the user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: senderEmail,
            subject: 'Thank you for your query',
            text: `Your query with ID ${contactUs.queryId} has been received. We will get back to you soon.`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            message: 'Contact us created successfully',
            data: contactUs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};