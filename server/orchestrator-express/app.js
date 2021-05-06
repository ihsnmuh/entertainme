const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const Routes = require('./routes/index');
const errHandler = require('./middlewares/errHandler');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Server Orchestrator Berjalan');
});

app.use(Routes);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
