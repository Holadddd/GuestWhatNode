const express = require('express');
const router = express.Router();
//Model
const GameAnswer = require('../Model/GameRoom/GameAnswerRQ');
const AnswerCheckRQ = require('../Model/GameRoom/AnswerCheckRQ');
const AnswerCheckRP = require('../Model/GameRoom/AnswerCheckRP');

router.get('/', (req, res) => {
    res.send('This GameRoom.');
});

module.exports = router;