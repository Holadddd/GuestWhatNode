const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { json } = require('body-parser');
//Model
const UserInfo = require('../Model/User/UserInfo');
const SetUserInfoRQ = require('../Model/User/SetUserInfoRQ');

const GameRoomInfo = require('../Model/GameRoom/GameRoomInfo');

const CreateGameRoomRQ = require('../Model/GameRoom/CreateGameRoomRQ');
const CreateGameRoomRP = require('../Model/GameRoom/CreateGameRoomRP');

const JoinGameRoomRQ = require('../Model/GameRoom/JoinGameRoomRQ');
const JoinGameRoomRP = require('../Model/GameRoom/JoinGameRoomRP');

const SetGameAnswer = require('../Model/GameRoom/SetGameAnswerRQ');
const AnswerCheckRQ = require('../Model/GameRoom/AnswerCheckRQ');
const AnswerCheckRP = require('../Model/GameRoom/AnswerCheckRP');

//Show the docker
router.post('/');
//-----------------------------GET---------------------------//
//G5-AnswerCheck
router.get('/AnswerCheck', async (req, res) => {
    let body = req.body
    let answerCheckRQ = new AnswerCheckRQ ({
        roomID: body.roomID,
        player: body.player,
        checkNumber: body.checkNumber
    })
    // query the answer from GameRoomInfo by player
    const setGameAnswer = await SetGameAnswer.find({roomID: answerCheckRQ.roomID})
    console.log(setGameAnswer)
    //Do the math
    let answerCheckRP = new AnswerCheckRP({
        guestNumber: answerCheckRQ.checkNumber,
        correctLocate: 1,
        includedNumber: 4
    })
    res.send(answerCheckRP);
});
//-----------------------------POST---------------------------//
//P1-User register with deviceID and userID 
router.post('/SetUserInfo', async (req, res) => {
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

//P2-Create GameRoom
router.post('/CreateGameRoom', async (req, res) => {
    let hostPlayer = req.body.hostPlayer
    //Create new room
    const gameRoomInfo = new GameRoomInfo ({
        hostPlayer: hostPlayer
    })

    try {
        //Store room in db
        const saveGameRoomInfo = await gameRoomInfo.save();

        const createGameRoomRP = new CreateGameRoomRP({
            roomID: saveGameRoomInfo._id,
            hostPlayer: saveGameRoomInfo.hostPlayer
        })

        res.send(createGameRoomRP);
        console.log('Did save');
    } catch(err) {
        console.log('fail');
        res.json({message: err});
    }
});

//P3-Join GameRoom
router.post('/JoinGameRoom', async (req, res) => {
    const reqBody = req.body
    //1.UpdateGameRoomInfo
    try {
        const updateGameRoomInfo = await GameRoomInfo.updateOne(
            //Find the room with roomID
            {_id: reqBody.roomID},
            //Update Info
            {
                $set:{guessPlayer: reqBody.guessPlayer}
            }
        )
        //2.Find the updated GameRoomInfo
        try {
            const _ = await GameRoomInfo.findOne({_id: reqBody.roomID}, (err, doc) => {
                const joinGameRoomRP = new JoinGameRoomRP ({
                    //The Room ID is GameRoomInfo default id
                    roomID: doc._id,
                    hostPlayer: doc.hostPlayer,
                    guessPlayer: doc.guessPlayer
                })
                res.send(joinGameRoomRP)
                console.log('Did Join GameRoom');
            })
        } catch(err) {
            console.log(err);
        res.json({message: err});
        }
    } catch(err) {
        console.log(err);
        res.json({message: err});
    }
});
//P4-SetGameAnswer
router.post('/SetGameAnswer', async (req, res) => {
    const reqBody = req.body;

    const setGameAnswer = new SetGameAnswer({
        roomID: reqBody.roomID,
        isHost: reqBody.isHost,
        player: reqBody.player,
        setsAnswer: reqBody.setsAnswer
    })

    try {
        if (setGameAnswer.isHost) {
            const gameRoomInfo = await GameRoomInfo.updateOne(
                {_id: setGameAnswer.roomID},
                {$set: {hostPlayerAnswer: setGameAnswer.setsAnswer}},
                (err, doc) => {
                    res.send(doc)
                    console.log('Set host answer')
                }
            )
            console.log(setGameAnswer.setsAnswer)
        } else {
            const gameRoomInfo = await GameRoomInfo.updateOne(
                {_id: setGameAnswer.roomID},
                {$set: {guessPlayerAnswer: setGameAnswer.setsAnswer}},
                (err, doc) => {
                    res.send(doc)
                    console.log('Set guess answer')
                }
            )
        }
    } catch(err) {
        console.log(err);
        res.json({message: err});
    }
})

module.exports = router;