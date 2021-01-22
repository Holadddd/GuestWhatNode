const mongoose = require('mongoose');

const GameRoomInfoSchema = mongoose.Schema({
    roomID: {
        type: String,
        required: false
    },
    hostPlayer: {
        type: String,
        required: true
    },
    hostPlayerAnswer: {
        type: Number,
        required: false
    },
    guessPlayer: {
        type: String,
        required: false
    },
    guessPlayerAnswer: {
        type: Number,
        required: false
    },
    createTime: {
        type: Date,
        default: Date()
    }
});
//Name this model
module.exports = mongoose.model('GameRoomInfo', GameRoomInfoSchema);