const express = require('express');
const app = express();
const movieRoute = require('./movie');
const tvseriesRoute = require('./tvseries');

app.use('/movies', movieRoute);
app.use('/tvseries', tvseriesRoute);

module.exports = app;
