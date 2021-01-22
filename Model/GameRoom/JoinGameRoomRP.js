const mongoose = require('mongoose');

const JoinGameRoomRPSchema = mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    hostPlayer: {
        type: String,
        required: true
    },
    guessPlayer: {
        type: String,
        required: true
    }
});
//Name this model
module.exports = mongoose.model('JoinGameRoomRP', JoinGameRoomRPSchema);