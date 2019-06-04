const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const zoosRouter = require('./zoos/zoosRouter')

// endpoints here
server.use('/api/zoos', zoosRouter);


module.exports = server;