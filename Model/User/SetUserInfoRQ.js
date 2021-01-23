const mongoose = require('mongoose');

const SetUserInfoRQSchema = mongoose.Schema({
    DeviceID:{
        type: String,
        require: false
    },
    UserID:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('SetUserInfoRQ', SetUserInfoRQSchema)