const express = require('express');
const router = express.Router();
//Model
const GameAnswer = require('../Model/GameRoom/GameAnswerRQ');
const AnswerCheckRQ = require('../Model/GameRoom/AnswerCheckRQ');
const AnswerCheckRP = require('../Model/GameRoom/AnswerCheckRP');

// router.get('/', (req, res) => {
//     res.send('This GameRoom.');
// });

router.get('/AnswerCheck', async (req, res) => {
    let body = req.body
    let answerCheckRQ = new AnswerCheckRQ ({
        player: body.player,
        checkNumber: body.checkNumber
    })
    // query the answer from another user

    let answerCheckRP = new AnswerCheckRP({
        guestNumber: answerCheckRQ.checkNumber,
        correctLocate: 1,
        includedNumber: 4
    })
    res.send(answerCheckRP);
});







module.exports = router;