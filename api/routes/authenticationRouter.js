const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./../../auth/authenticate.js');
const Users = require('./../../models/usersModel.js')

const server = express.Router();

// to access locally, create a .env file and add a variable with the name
// JWT_SECRET = "a string"
const jwtKey = process.env.JWT_SECRET;

// function that generates the token using jwt.
// it takes in 3 arguments: payload, jwtKey, and options.
function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options ={
    expiresIn: '1d'
  };
  return jwt.sign(payload, jwtKey, options)
};

// POST method using /authentication/register
// possible table items for users are:
// id (for registering, this value is automatically created by the database)
// username - Required object - username for user (unique value - capitalization matters) - register method will throw an error without username.
// first_name - user's first name
// last_name - user's last name
// gender - user's gender
// avatar - string that can be linked to a user's avatar(profile photo if used)
// password - Required object when registering, register method would throw error without password.
server.post('/register', (req,res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(user);
      res.status(201).json({
        id: saved.id,
        token,
        message: `Welcome ${user.username}`
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

// login method using POST method using /authentication/login
// takes in two arguments in the request body
// username and password
server.post('/login', (req,res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({
          token,
          message: `Welcome ${user.username}!`,
          id: user.id
        })
      } else {
        res.status(401).json({message: 'Invalid Credentials'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
