const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const { connect } = require('./config/mongodb');
const Routes = require('./routes/index');
const errHandler = require('./middlewares/errHandler');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Server Movies JALAN');
});

app.use(Routes);

app.use(errHandler);

connect().then(async (db) => {
  // console.log(db);
  console.log('MongoDB sudah nyambung');
  database = db;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
