const express = require('express');
const app = express();
const movieRoute = require('./movie');

app.use('/movies', movieRoute);

module.exports = app;
