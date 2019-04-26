const express = require('express');
const axios = require('axios');


const Trips = require('./../../models/tripsModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}



module.exports = server;
