const mongoose = require('mongoose');

const UserInfoSchema = mongoose.Schema({
    DeviceID:{
        type: String,
        required: false
    },
    UserID:{
        type: String,
        required: true
    },
    WinCount: {
        type: Number,
        default: 0
    },
    LossCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('UserInfo', UserInfoSchema)