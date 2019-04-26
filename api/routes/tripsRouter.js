const express = require('express');
const axios = require('axios');


const Trips = require('./../../models/tripsModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

server.get('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  Trips
    .findById(id)
    .then(foundTrip => {
      res.json(foundTrip)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.post('/', authenticate, (req,res) => {
  let trip = req.body;

  Trips
    .add(trip)
    .then(trip =>{
      res.status(200).json(trip)
    })
    .catch(err => {
      console.log(err)
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.delete('/:id', authenticate, (req,res) => {
  const { id } = req.params;

  Trips
    .remove(id)
    .then(trip => {
      res.status(200).json(trip)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})



module.exports = server;
