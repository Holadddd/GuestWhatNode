//GuestWhatNodeService
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Router
const dockerRouter = require('./Router/docker');
const gameRoomRouter = require('./Router/gameRoom');
const userRouter = require('./Router/user');

const cors = require('cors');
const bodyParser = require('body-parser');
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/Docker', dockerRouter);
app.use('/GameRoom', gameRoomRouter);
app.use('/User', userRouter);

const server = require('http').Server(app);
const port = process.env.PORT || 3000;

//Connet to DB
const uris = process.env.DB_CONNECTION;
mongoose.connect(uris ,{useUnifiedTopology: true, useNewUrlParser: true} ,(err, db) => {
  
  console.log('Connect to DB');
});

server.listen(port, function(req, res)  {
console.log('Example app listening on port 3000!');
});