const mongoose = require('mongoose');

const CheckedAnswerRQ = mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    isHost: {
        type: Boolean,
        required: true
    },
    player: {
        type: String,
        required: true
    },
    checkNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CheckedAnswerRQ', CheckedAnswerRQ);