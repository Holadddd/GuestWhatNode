//GuestWhatNodeService
const express = require('express');
const app = express();

//Router
const dockerRouter = require('./Router/docker');
const gameRoomRouter = require('./Router/gameRoom');

const cors = require('cors');
const bodyParser = require('body-parser');
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/Docker', dockerRouter);
app.use('/GameRoom', gameRoomRouter);

const server = require('http').Server(app);
const port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log(`listening on port ${port}`);
  });