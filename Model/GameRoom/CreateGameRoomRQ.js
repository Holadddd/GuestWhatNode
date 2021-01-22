const mongoose = require('mongoose');

const CreateGameRoomRQSchema = mongoose.Schema({
    hostPlayer: {
        type: String,
        required: true
    }
});
//Name this model
module.exports = mongoose.model('CreateGameRoomRQ', CreateGameRoomRQSchema);