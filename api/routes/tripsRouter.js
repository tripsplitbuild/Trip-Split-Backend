const express = require('express');
const axios = require('axios');


const Trips = require('./../../models/tripsModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}
// ** NOTE:
// ALL ROUTES USES AUTTHENTICATE MIDDLEWARE, WHICH MEANS SETTING A VALID TOKEN IN THE HEADER'S IS MANDATORY **



// route to get all the trips as an array of objects.
// unnecessary for app but used for development.
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

// route /trips/:id
// GET METHOD using trip's ID returns an object with
// {
//     "trip_id": integer referring to the trip's id,
//     "trip_name": "String referring to the trip's name",
//     "trip_owner_id": integer referring to the user id who owns the trip ,
//     "trip_close_trip": boolean value to see whether trip is closed or still open.,
//     "trip_start_date": Date for when trip starts
//     "trip_end_date": Date for when trip ends
//     "trip_members": [
//         {
//            "tripMember_id": refers to the tripMember id not the user but the primary key in tripMember.
//             "member_username": member's username
//         }
//     ],
//     "expenseInfo": [
//         {
//             "expense_id": id referring to the expense's id,
//             "expense_name": "String referring to the expense's name",
//             "expense_total": Float value referring to the total of the expense.
//         }
//     ]
// }
server.get('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  Trips
    .findMembers(id)
    .then(foundTrip => {
      let tripWithMembers = foundTrip.map(trip =>{
        let tripMember_id = trip.tripMembers_id
        let member = trip.trip_username
        let tripMember = {
          tripMember_id: tripMember_id,
          member_username: member
        }
        return tripMember
      })
      const tripData = {
        trip_id: foundTrip[0].trip_id,
        trip_name: foundTrip[0].trip_name,
        trip_owner_id: foundTrip[0].tripOwner_id,
        trip_close_trip: foundTrip[0].close_trip,
        trip_start_date: foundTrip[0].start_date,
        trip_end_date: foundTrip[0].end_date,
        trip_members: tripWithMembers
      }
      return tripData
    })
    .then(tripData =>{
      Trips
        .findExpenses(tripData.trip_id)
        .then(tripExpenses => {
          const thisTripExpenses = tripExpenses.map(expense => {
            let id = expense.id
            let trip_expense_name = expense.expense_name
            let expense_total = expense.expense_total
            let expenseInfo = {
              expense_id: id,
              expense_name: trip_expense_name,
              expense_total: expense_total
            }
            return expenseInfo
          })
          const tripWithExpenseData = {
            trip_id: tripData.trip_id,
            trip_name: tripData.trip_name,
            trip_owner_id: tripData.trip_owner_id,
            trip_close_trip: tripData.trip_close_trip,
            trip_start_date: tripData.trip_start_date,
            trip_end_date: tripData.trip_end_date,
            trip_members: tripData.trip_members,
            expenseInfo: thisTripExpenses
          }
          res.json(tripWithExpenseData)
        })
    })
    .catch(err => {
      console.log(err)
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// POST method using trips/
// Values it takes in are:
// close_trip: a boolean value true or false,
// trip_name: 'String referring to the trip's name'
// user_id: Integer referring to the user id who owns the trip.
// start_date: Date referring to when trip starts
// end_date: Date referring to when trip ends

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

// DELETE METHOD trips/:id
// only requires the trip id to delete a trip.

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

// PUT method trip/:id
// * FRONT END NOTE: axios call requires three argument
// axios.post( address with id, reqOptions(where tokens are stored), object(see below)

//object referring to the following:
// object = {
//  close_trip: a boolean value true or false,
//  trip_name: 'String referring to the trip's name'
//  user_id: Integer referring to the user id who owns the trip.
// start_date: Date referring to when trip starts
// end_date: Date referring to when trip ends
// }


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
