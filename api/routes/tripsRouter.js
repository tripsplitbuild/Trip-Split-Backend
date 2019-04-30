const express = require('express');
const axios = require('axios');


const Trips = require('./../../models/tripsModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

server.get('/', authenticate, (req,res) => {
  Trips
    .find()
    .then(trips => {
      res.json(trips)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

server.get('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  Trips
    .findMembers(id)
    .then(foundTrip => {
      let tripWithMembers = foundTrip.map(trip =>{
        let id = trip.tripMemberID
        let member = trip.trip_username
        let isTripClosed = trip.close_trip
        let tripMember = {
          id: id,
          member_name: member,
          isTripClosed: isTripClosed
        }
        return tripMember
      })
      const tripData = {
        trip_id: foundTrip[0].trip_id,
        trip_name: foundTrip[0].trip_name,
        trip_owner_id: foundTrip[0].tripOwner_id,
        trip_close_trip: foundTrip[0].close_trip,
        trip_members: tripWithMembers
      }
      res.json(tripData)
    })
    .catch(err => {
      console.log(err)
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

server.put('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  const changes = req.body;

  Trips
   .edit(id, changes)
   .then(editedData => {
     res.status(200).json(editedData)
   })
   .catch(err => {
     return errorHelper(500, 'Internal Server Error', res);
   })
})



module.exports = server;
