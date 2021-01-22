const mongoose = require('mongoose');

const JoinGameRoomRQSchema = mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    guessPlayer: {
        type: String,
        required: true
    }
});
//Name this model
module.exports = mongoose.model('JoinGameRoomRQ', JoinGameRoomRQSchema);