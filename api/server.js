const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');


const authenticateRouter = require('./routes/authenticationRouter.js');
const userRouter = require('./routes/userRouter.js');
const tripRouter = require('./routes/tripsRouter.js');
const tripMemberRouter = require('./routes/tripsMembersRouter.js');
const expenseRouter = require('./routes/expenseRouter.js');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(express.json());

server.use('/authentication', authenticateRouter);
server.use('/users', userRouter);
server.use('/trips', tripRouter);
server.use('/tripMembers', tripMemberRouter);
server.use('/expense', expenseRouter);

server.get('/', async(req,res) => {
  res.status(200).json({ message: 'Welcome'})
});




module.exports = server;
