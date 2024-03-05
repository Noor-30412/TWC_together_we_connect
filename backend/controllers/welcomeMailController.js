const WelcomeMail = require('../models/WelcomeMail');
const nodemailer = require('nodemailer');

exports.createWelcomeMail = async (req, res) => {
    try {
        const { senderEmail, category, description } = req.body;

        const welcomeMail = new WelcomeMail({
            senderEmail,
            category,
            description
        });

        await welcomeMail.save();

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
            
            subject: 'The First Employees of TWC - Together We Connect',
            
            text: `
            Dear New Team Member,

            Welcome to TWC - Together We Connect! 🎉 We are thrilled to have you join our team as one of our inaugural employees. Your expertise and enthusiasm are invaluable assets as we embark on this exciting journey together.

            At TWC, we're not just building an ecommerce website; we're crafting an experience, a community, and a platform that fosters meaningful connections. As one of our pioneering team members, you play a pivotal role in shaping the future of our company and the services we provide.

            Your dedication, creativity, and passion are precisely what we were seeking, and we have every confidence that you will make significant contributions to our success. As part of our team, you'll have the opportunity to collaborate with talented individuals, explore innovative ideas, and push the boundaries of what's possible in the ecommerce industry.

            We understand that starting something new can be both exhilarating and challenging. Rest assured, we are committed to supporting you every step of the way. Whether you have questions, ideas, or concerns, our doors—and in this digital age, our virtual channels—are always open.

            As we embark on this journey together, remember that your voice matters, your ideas are valued, and your efforts are appreciated. Together, we will overcome obstacles, celebrate milestones, and create something truly exceptional.

            Once again, welcome to TWC - Together We Connect. We're thrilled to have you on board, and we can't wait to see what incredible things we'll accomplish together.

            Warm regards,
            TWC - Together We Connect
        `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            message: 'Welcome mail sent successfully',
            data: welcomeMail
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};