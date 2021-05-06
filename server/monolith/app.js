const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { connect } = require('./config/mongodb');
const Routes = require('./routes/index');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Server Jalan');
});

app.use(Routes);

connect().then(async (db) => {
  // console.log(db);
  console.log('MongoDB sudah nyambung');
  database = db;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
