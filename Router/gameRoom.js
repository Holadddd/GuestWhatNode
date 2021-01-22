const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Model
const SetGameAnswer = require('../Model/GameRoom/SetGameAnswerRQ');
const AnswerCheckRQ = require('../Model/GameRoom/AnswerCheckRQ');
const AnswerCheckRP = require('../Model/GameRoom/AnswerCheckRP');


//Show the docker
router.get('/', (req, res) => {
    res.send('This GameRoom.');
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