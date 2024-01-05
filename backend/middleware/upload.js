// middleware/upload.js

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.originalname;//use unique file names
        console.log('Uploading file:', fileName); // Log the file being uploaded
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
