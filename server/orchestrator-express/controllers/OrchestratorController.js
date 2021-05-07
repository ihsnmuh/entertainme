const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const movieURL = 'http://localhost:4001';
const tvseriesURL = 'http://localhost:4002';

class OrchestratorController {
  static async findAll(req, res, next) {
    try {
      const movieData = await redis.get('movies');
      const tvseriesData = await redis.get('tvseries');

      if (movieData && tvseriesData) {
        let movies = JSON.parse(movieData);
        let tvSeries = JSON.parse(tvseriesData);
        return res.status(200).json({ movies, tvSeries });
      } else if (!movieData) {
        let tvSeries = JSON.parse(tvseriesData);

        axios({
          url: movieURL + '/movies',
          method: 'GET',
        })
          .then(({ data }) => {
            redis.set('movies', JSON.stringify(data));
            res.status(200).json({ movies: data, tvSeries });
          })
          .catch((err) => {
            next(err);
          });
      } else if (!tvseriesData) {
        let movies = JSON.parse(movieData);

        axios({
          url: tvseriesURL + '/tvseries',
          method: 'GET',
        })
          .then(({ data }) => {
            // console.log(data);
            redis.set('tvseries', JSON.stringify(data));
            res.status(200).json({ movies, tvSeries: data });
          })
          .catch((err) => {
            next(err);
          });
      } else if (!movieData && !tvseriesData) {
        let moviesNew = null;
        let tvseriesNew = null;

        axios({
          url: movieURL + '/movies',
          method: 'GET',
        })
          .then(({ data }) => {
            redis.set('movies', JSON.stringify(data));
            moviesNew = JSON.parse(data);
          })
          .catch((err) => {
            next(err);
          });

        axios({
          url: tvseriesURL + '/tvseries',
          method: 'GET',
        })
          .then(({ data }) => {
            redis.set('tvseries', JSON.stringify(data));
            moviesNew = JSON.parse(data);
          })
          .catch((err) => {
            next(err);
          });

        if (moviesNew && tvseriesNew) {
          res.status(200).json({ movies: moviesNew, tvSeries: tvseriesNew });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrchestratorController;
