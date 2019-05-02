const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

// Routers
const authenticateRouter = require('./routes/authenticationRouter.js');
const userRouter = require('./routes/userRouter.js');
const tripRouter = require('./routes/tripsRouter.js');
const tripMemberRouter = require('./routes/tripsMembersRouter.js');
const expenseRouter = require('./routes/expenseRouter.js');
const expenseMemberRouter = require('./routes/expenseMemberRouter.js');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(express.json());

// Refer to each end point and use the following Router to have a web address access.
// example:
// using a Get by ID Method for users with id: 2 using localhost, your route would be
// GET method pointing to -> localhost:9090/users/2 --> for local machines.
server.use('/authentication', authenticateRouter);
server.use('/users', userRouter);
server.use('/trips', tripRouter);
server.use('/tripMembers', tripMemberRouter);
server.use('/expense', expenseRouter);
server.use('/expenseMember', expenseMemberRouter);

server.get('/', async(req,res) => {
  res.status(200).json({ message: 'Welcome'})
});




module.exports = server;
