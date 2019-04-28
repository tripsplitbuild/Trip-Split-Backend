const express = require('express');
const axios = require('axios');

const Users = require('./../../models/usersModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

server.get('/:id', authenticate, (req,res) => {
  const { id } = req.params;
  Users
    .findByIdWithTrips(id)
    .then(foundUser => {
      res.json(foundUser)
    })
    .catch(err => {
      console.log(err)
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.put('/:id', authenticate, (req,res) => {
  const { id } = req.params;

  const changes = req.body;

  Users
    .edit(id, changes)
    .then(editedData => {
      res.json(editedData)
    })
    .catch(err =>{
      return errorHelper(500, 'Internal Server Error', res);
    })
})


module.exports = server;
