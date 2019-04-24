const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(express.json());


server.get('/', async(req,res) => {
  res.status(200).json({ message: 'Welcome'})
});


module.exports = server;
