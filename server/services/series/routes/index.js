const express = require('express');
const app = express();
const tvseriesRoute = require('./tvseries');

app.use('/tvseries', tvseriesRoute);

module.exports = app;
