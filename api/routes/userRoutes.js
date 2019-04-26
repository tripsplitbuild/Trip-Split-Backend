const express = require('express');
const axios = require('axios');

const Users = require('./../../models/usersModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

server.get('/:id', authenticate, (req,res) => {
    console.log('hello May');
    res.send('hello')
})


module.exports = server;
