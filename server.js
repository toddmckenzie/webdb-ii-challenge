const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const zoosRouter = require('./zoos/zoosRouter')
const bearsRouter = require('./bears/bearsRouter')
// endpoints here
server.use('/api/zoos', zoosRouter);
server.use('/api/bears', bearsRouter);

module.exports = server;