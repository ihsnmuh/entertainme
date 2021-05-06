const axios = require('axios');

const movieURL = 'http://localhost:4001';
const tvseriesURL = 'http://localhost:4002';

class OrchestratorController {
  static findAll(req, res, next) {
    axios({
      url: tvseriesURL + '/tvseries',
      method: 'GET',
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
}
