const express = require('express');
const axios = require('axios');


const Expense = require('./../../models/expenseModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}
// ** NOTE:
// ALL ROUTES USES AUTTHENTICATE MIDDLEWARE, WHICH MEANS SETTING A VALID TOKEN IN THE HEADER'S IS MANDATORY **


// GET Method that gets all the expenses regardless of the trip id, not an important method. Used it for manual testing to see if data is being updated.
server.get('/', authenticate, (req,res) => {
  Expense
    .find()
    .then(expense => {
      res.json(expense)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// GET method requires an id
// Returns the following object type:
// {
//     "expense_id": Integer - the primary key of expense ,
//     "trip_id": Integer - the id of the trips in which this expense belongs to ,
//     "expense_total": Float - the total cost of this expense. ,
//     "expense_name": "String - refers to the expense name",
//     "expenseMember": [
//         {
//              "expenseMember_id": Integer - refers to the primary //key of expenseMember. Can be use to refer as id for editing and //deleting
//             "expenseMemberName": "String referring to the username of a user who paid",
//             "amountPaid": Float referring to the amount paid by the expenseMemberName(user who paid)
//         }
//     ]
// }
server.get('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  Expense
    .findMembers(id)
    .then(expense => {
      let expenseWithMembers = expense.map(expenseMember =>{
        let expenseMember_id = expenseMember.expenseMember_id;
        let member = expenseMember.expense_username;
        let amountPaid = expenseMember.expense_amount_paid;
        let memberInfo = {
          expenseMember_id: expenseMember_id,
          expenseMemberName: member,
          amountPaid: amountPaid
        }
        return memberInfo
      })
      const memberData ={
        expense_id: expense[0].expense_id,
        trip_id: expense[0].trip_id,
        expense_total: expense[0].expense_total,
        expense_name: expense[0].expense_name,
        expenseMember: expenseWithMembers
      }
      res.json(memberData)
    })
    .catch(err => {
      console.log(err)
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// Post method can have the following value when being created:
// expense_name: referring to the title of the expense
// trip_id: referring to the trip's id where the expense belongs to.
// expense_total: refers to the total cost of this expense.

server.post('/', authenticate, (req,res) => {
  let expense = req.body;

  Expense
    .add(expense)
    .then(expense =>{
      res.status(200).json(expense)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// delete method requires and expense id.

server.delete('/:id', authenticate, (req,res) => {
  const { id } = req.params;

  Expense
    .remove(id)
    .then(expense => {
      res.status(200).json(expense)
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    })
})

// PUT method expense/:id
// * FRONT END NOTE: axios call requires three argument
// axios.post( address with id, reqOptions(where tokens are stored), object(see below)

//Objects that can be edited in expense:
// expense_name: referring to the title of the expense
// trip_id: referring to the trip's id where the expense belongs to.
// expense_total: refers to the total cost of this expense.

server.put('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  const changes = req.body;

  Expense
   .edit(id, changes)
   .then(editedData => {
     res.status(200).json(editedData)
   })
   .catch(err => {
     return errorHelper(500, 'Internal Server Error', res);
   })
})



module.exports = server;
