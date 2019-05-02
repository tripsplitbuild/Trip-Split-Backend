const express = require('express');
const axios = require('axios');


const ExpenseMember = require('./../../models/expenseMemberModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

server.get('/', authenticate, (req,res) => {
  ExpenseMember
    .find()
    .then(expenseMember => {
      res.json(expenseMember)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// GET method expenseMember/:id
// Returns an object with the following values:
// {
//     "id": Integer referring to the primary key (used for editing/deleting),
//     "expense_username": "String referring to the username of an existing member.",
//     "expense_id": Integer referring to the expense in which the user paid for. ,
//     "expense_amount_paid": Float referring to the amount the user paid.
// }

server.get('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  ExpenseMember
    .findById(id)
    .then(expenseMember => {
      res.json(expenseMember)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// POST METHOD can use the following values when sending the request
// expense_username: refers to the user's username
// expense_id: refers to the expense id in which this payment belongs to.
// expense_amount_paid: refers to the amount the specific user paid for.


server.post('/', authenticate, (req,res) => {
  let expenseMember = req.body;

  ExpenseMember
    .add(expenseMember)
    .then(expenseMember =>{
      res.status(200).json(expenseMember)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// DELETE METHOD just requires a valid expenseMember id.
server.delete('/:id', authenticate, (req,res) => {
  const { id } = req.params;

  ExpenseMember
    .remove(id)
    .then(expenseMember => {
      res.status(200).json(expenseMember)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// PUT METHOD requires, an ID,
// Can edit the following object. 
// expense_username: refers to the user's username
// expense_id: refers to the expense id in which this payment belongs to.
// expense_amount_paid: refers to the amount the specific user paid for.

server.put('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  const changes = req.body;

  ExpenseMember
   .edit(id, changes)
   .then(editedData => {
     res.status(200).json(editedData)
   })
   .catch(err => {
     return errorHelper(500, 'Internal Server Error', res);
   })
})



module.exports = server;
