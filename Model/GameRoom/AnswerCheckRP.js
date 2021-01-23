const mongoose = require('mongoose');

const CheckedAnswerRP = mongoose.Schema({
    guestNumber: {
        type: Number,
        required: true
    },
    //A
    correctLocate: {
        type: Number,
        required: true
    },
    //B
    includedNumber: {
        type: Number,
        required: true
    },
    resultString: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('AnswerCheckRP', CheckedAnswerRP);