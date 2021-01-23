const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { json } = require('body-parser');

const UserInfo = require('../Model/User/UserInfo');
const SetUserInfoRQ = require('../Model/User/SetUserInfoRQ');

//-----------------------------GET---------------------------//
//G1-User current name
router.get('/Info', async (req, res) => {
    const userDeviceID = req.body.DeviceID
    
    try {
        const findUserInfo = await UserInfo.findOne({
            DeviceID: userDeviceID
        },
        (err, doc) => {
            res.send(doc)
        }) 
    } catch(err) {
        console.log(err);
        res.json({message: err});
    }
});

//-----------------------------POST---------------------------//
//P1-User register with deviceID and userID 
router.post('/SetInfo', async (req, res) => {
    const userInfo = new UserInfo({
        DeviceID: req.body.DeviceID,
        UserID: req.body.UserID
    });

    try {
        const saveUserInfo = await userInfo.save();
        console.log('Did save');
        res.send(saveUserInfo)
    } catch(err) {
        console.log(err);
        res.json({message: err});
    }

});

module.exports = router;