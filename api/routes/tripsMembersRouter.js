const express = require('express');
const axios = require('axios');


const TripMembers = require('./../../models/tripsMembersModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

// ** NOTE:
// ALL ROUTES USES AUTTHENTICATE MIDDLEWARE, WHICH MEANS SETTING A VALID TOKEN IN THE HEADER'S IS MANDATORY **


// get route for all the trip members created.
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

// a get route using id, will return the following object:
// {
//     "id": Integer referring to the trip member id (primary key),
//     "trip_username": "String referring to a user's username",
//     "trip_id": Integer referring to the trip id.
// }

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

// POST method using the following values:
// "trip_username": "String referring to user that's not the owner of the trip",
// "trip_id": Integer referring to the trip id.

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

// DELETE method requiring only the id of the object.
// id is the primary key. each trip member created will have a specific id
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

// PUT method requiring the tripMembers_id
// can edit the following values: 
// "trip_username": "String referring to user that's not the owner of the trip",
// "trip_id": Integer referring to the trip id.
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
