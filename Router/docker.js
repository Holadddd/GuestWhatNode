const express = require('express');
const router = express.Router();
const fs = require('fs');
const docker = fs.readFileSync('./HTML/docker.html', 'utf8');

router.get('/', (req, res) => {
    res.send(docker)
})

module.exports = router;