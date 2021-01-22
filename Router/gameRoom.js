const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Model
const CreateGameRoomRQ = require('../Model/GameRoom/CreateGameRoomRQ');
const CreateGameRoomRP = require('../Model/GameRoom/CreateGameRoomRP');
const GameRoomInfo = require('../Model/GameRoom/GameRoomInfo');
const SetGameAnswer = require('../Model/GameRoom/SetGameAnswerRQ');
const AnswerCheckRQ = require('../Model/GameRoom/AnswerCheckRQ');
const AnswerCheckRP = require('../Model/GameRoom/AnswerCheckRP');


//Show the docker
router.post('/');

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

//P3-SetGameAnswer
router.post('/SetGameAnswer', async (req, res) => {
    const reqBody = req.body;

    console.log(reqBody);

    const setGameAnswer = new SetGameAnswer({
        roomID: reqBody.roomID,
        player: reqBody.player,
        setsAnswer: reqBody.setsAnswer
    });

    try {
        const saveGameAnswer = await setGameAnswer.save()
        res.send(saveGameAnswer);
        console.log('Did save');
    } catch (err) {
        res.json({message: err});
        console.log('fail');
        console.log(err);
    }
});




module.exports = router;