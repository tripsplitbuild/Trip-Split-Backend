const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./../../auth/authenticate.js');

const Users = require('./../../models/usersModel.js')

const server = express.Router();

const jwtKey = process.env.JWT_SECRET;




module.exports = server;
