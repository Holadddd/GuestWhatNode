const mongoose = require('mongoose');

const GameAnswer = mongoose.Schema({
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
module.exports = mongoose.model('./GameAnswer', GameAnswer);