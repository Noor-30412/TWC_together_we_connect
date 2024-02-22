const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    queryId: {
        type: String,
        default: function () {
            return this._id.toString();
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);