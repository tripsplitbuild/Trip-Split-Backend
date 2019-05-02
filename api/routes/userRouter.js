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

// ** NOTE:
// ALL ROUTES USES AUTTHENTICATE MIDDLEWARE, WHICH MEANS SETTING A VALID TOKEN IN THE HEADER'S IS MANDATORY **

// possible table items for users are:
// id (for registering, this value is automatically created by the database)
// username - Required object - username for user (unique value - capitalization matters) - register method will throw an error without username.
// first_name - user's first name
// last_name - user's last name
// gender - user's gender
// avatar - string that can be linked to a user's avatar(profile photo if used)
// password - Required object when registering, register method would throw error without password.

// GET method, with a middleware to make sure that a token is saved to the headers as Authorizaiton: token.
// returns user object
// {
//   username: 'A String referring to user's username',
//   first_name: 'A String referring to user's first_name',
//   last_name: 'A String referring to user's last_name',
//   gender: 'A String referring to user's gender',
//   avatar: 'A String referring to user's avatar (profile picture)',
//   ownedTrips: {
//     id: Integer (refers to the trip id)
//     trip_name: "A String referring to trip's name",
//     isTripClosed: "Boolean" - 0/1 value
//   },
//   memberTrips: {
//     trip_id: Integer referring to a trip's,
//     trip_name: "String referring to trip__name"
//  }
//}
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
          console.log('just a member',justAMember)
          const tripUserIsMember = justAMember.map(trip =>{
            let trip_id = trip.trip_id
            let trip_name = trip.trip_name
            let myMember = {
              trip_id: trip_id,
              trip_name: trip_name
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
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// edit method using the user's id.
// can edit
// username:
// first_name:
// last_name:
// gender:
// avatar:

// PUT method users/:id
// * FRONT END NOTE: axios call requires three argument
// axios.post( address with id, reqOptions(where tokens are stored), object(see below)

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
