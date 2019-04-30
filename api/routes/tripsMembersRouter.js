const express = require('express');
const axios = require('axios');


const TripMembers = require('./../../models/tripsMembersModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

server.get('/', authenticate, (req,res) => {
  TripMembers
    .find()
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.get('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  TripMembers
    .findById(id)
    .then(foundMembers => {
      res.json(foundMembers)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.post('/', authenticate, (req,res) => {
  let tripMember = req.body;

  TripMembers
    .add(tripMember)
    .then(tripMember =>{
      res.status(200).json(tripMember)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.delete('/:id', authenticate, (req,res) => {
  const { id } = req.params;

  TripMembers
    .remove(id)
    .then(tripMember => {
      res.status(200).json(tripMember)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.put('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  const changes = req.body;

  TripMembers
   .edit(id, changes)
   .then(editedData => {
     res.status(200).json(editedData)
   })
   .catch(err => {
     return errorHelper(500, 'Internal Server Error', res);
   })
})



module.exports = server;
