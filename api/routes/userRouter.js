const express = require('express');
const axios = require('axios');

const Users = require('./../../models/usersModel.js');
const Trips = require('./../../models/tripsModel.js');
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
      let userOwnedTrips = foundUser.map(user => {
        let id = user.id
        let trip_name = user.trip_name
        let tripItem = {
          id: id,
          trip_name: trip_name
        }
        return tripItem
      })
      const userData = {
        currentUser: foundUser[0].user_id,
        name: foundUser[0].username,
        first_name: foundUser[0].first_name,
        last_name: foundUser[0].last_name,
        gender: foundUser[0].gender,
        avatar: foundUser[0].avatar,
        OwnedTrips: userOwnedTrips
      }
      res.json(userData)
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
