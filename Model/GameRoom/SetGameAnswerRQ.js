const mongoose = require('mongoose');

const SetGameAnswerSchema = mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    player: {
        type: String,
        required: true
    },
    setsAnswer: {
        type: Number,
        required: true
    }
});
//Name this model
module.exports = mongoose.model('SetGameAnswer', SetGameAnswerSchema);