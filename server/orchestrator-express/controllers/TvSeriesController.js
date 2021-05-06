// const TvSeries = require('../models/tvseries');
const axios = require('axios');

const baseURL = 'http://localhost:4002';

class TvSeriesController {
  static findAll(req, res, next) {
    axios({
      url: baseURL + '/tvseries',
      method: 'GET',
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static addTvSeries(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;

    axios({
      url: baseURL + '/tvseries',
      method: 'POST',
      data: {
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: popularity,
        tags: tags,
      },
    })
      .then(({ data }) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static findById(req, res, next) {
    const id = req.params.id;

    axios({
      url: baseURL + `/tvseries/${id}`,
      method: 'GET',
    })
      .then(({ data }) => {
        if (data.length === 0) {
          throw { name: 'NotFound' };
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateTvSeries(req, res, next) {
    const id = req.params.id;
    const { title, overview, poster_path, popularity, tags } = req.body;

    axios({
      url: baseURL + `/tvseries/${id}`,
      method: 'PUT',
      data: {
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: popularity,
        tags: tags,
      },
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteTvSeries(req, res, next) {
    const id = req.params.id;

    axios({
      url: baseURL + `/tvseries/${id}`,
      method: 'DELETE',
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TvSeriesController;
