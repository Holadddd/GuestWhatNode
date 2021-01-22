const mongoose = require('mongoose');

const CreateGameRoomRPSchema = mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    hostPlayer: {
        type: String,
        required: true
    }
});
//Name this model
module.exports = mongoose.model('CreateGameRoomRP', CreateGameRoomRPSchema);