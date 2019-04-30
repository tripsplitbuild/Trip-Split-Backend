const express = require('express');
const axios = require('axios');

const Users = require('./../../models/usersModel.js');
const Trips = require('./../../models/tripsModel.js');
const TripMember = require('./../../models/tripsMembersModel.js');
const db = require('./../../data/dbConfig.js');
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
        let isTripClosed = user.close_trip
        let tripItem = {
          id: id,
          trip_name: trip_name,
          isTripClosed: isTripClosed
        }
        return tripItem
      })

      const userData = {
        username: foundUser[0].username,
        first_name: foundUser[0].first_name,
        last_name: foundUser[0].last_name,
        gender: foundUser[0].gender,
        avatar: foundUser[0].avatar,
        OwnedTrips: userOwnedTrips
      }
      return userData

    })
    .then(userData => {
      TripMember
        .findMember(userData.username)
        .then(justAMember => {
          const tripUserIsMember = justAMember.map(trip =>{
            let trip_member_id = trip.trip_id
            let trip_member_name = trip.trip_name
            let myMember = {
              trip_member_id: trip_member_id,
              trip_member_name: trip_member_name
            }
            return myMember
          })

          const userWithMembershipData = {
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            gender: userData.gender,
            avatar: userData.avatar,
            ownedTrips: userData.OwnedTrips,
            memberTrips: tripUserIsMember
          }
          res.json(userWithMembershipData)
        })
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
