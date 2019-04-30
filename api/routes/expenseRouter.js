const express = require('express');
const axios = require('axios');


const Expense = require('./../../models/expenseModel.js')
const { authenticate } = require('./../../auth/authenticate.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({ err: message })
}

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

server.get('/:id', authenticate, (req,res) =>{
  const { id } = req.params;

  Expense
    .findMembers(id)
    .then(expense => {
      let expenseWithMembers = expense.map(expenseMember =>{
        let id = expenseMember.id;
        let member = expenseMember.expense_username;
        let amountPaid = expenseMember.expense_amount_paid;
        let memberInfo = {
          id: id,
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

server.post('/', authenticate, (req,res) => {
  let expense = req.body;

  Expense
    .add(expense)
    .then(expense =>{
      res.status(200).json(expense)
    })
    .catch(err => {
      console.log(err)
      return errorHelper(500, 'Internal Server Error', res);
    })
})

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
