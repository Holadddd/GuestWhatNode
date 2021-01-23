const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { json } = require('body-parser');
//Model

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
//G2-GameRoom List
router.get('/List', async (req, res) => {

        try {
            const gameRoomList = await GameRoomInfo.find((err, doc) =>{
                res.send(doc);
            })
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
        isHost: body.isHost,
        player: body.player,
        checkNumber: body.checkNumber
    })
    // query the answer from GameRoomInfo by player
    try {
        const setGameAnswer = await GameRoomInfo.find({_id: answerCheckRQ.roomID},(err, doc)=>{
            
            const roomInfo = doc[0]
            console.log(roomInfo);
            if (answerCheckRQ.isHost) {
                const answerCheckRP = numberChecker(roomInfo.guessPlayerAnswer, answerCheckRQ.checkNumber);
                res.send(answerCheckRP);
            } else {
                const answerCheckRP = numberChecker(roomInfo.hostPlayerAnswer, answerCheckRQ.checkNumber);
                res.send(answerCheckRP);
            }
        })
    } catch(err) {
        console.log('fail');
        res.json({message: err});
    }
    
    
    // res.send(answerCheckRP);
});
//-----------------------------POST---------------------------//

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

function numberChecker(answer, check) {
    let answerString = String(answer)
    let checkString = String(check)

    var correctLocate = 0;
    var includedNumber = 0;

    for (s in checkString){
        let checkTmp = checkString[s]
        let answerTmp = answerString[s]
        if (answerString.includes(checkTmp)) {
            includedNumber += 1;
        }
        if (checkTmp == answerTmp) {
            correctLocate += 1;
        }
    }
    
    let resultString = String(correctLocate)+'A'+String(includedNumber-correctLocate)+'B'
    return new AnswerCheckRP({
        guestNumber: check,
        correctLocate: correctLocate,
        includedNumber: includedNumber,
        resultString: resultString
    })
}