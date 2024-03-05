const mongoose = require('mongoose');

const WelcomeMailSchema = new mongoose.Schema({
    senderEmail: {
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

module.exports = mongoose.model('WelcomeMail', WelcomeMailSchema);