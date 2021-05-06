// const Movie = require('../models/movie');
const axios = require('axios');

const baseURL = 'http://localhost:4001';

class MovieController {
  static findAll(req, res, next) {
    axios({
      url: baseURL + '/movies',
      method: 'GET',
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static addMovie(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;

    axios({
      url: baseURL + '/movies',
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
      url: baseURL + `/movies/${id}`,
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

  static updateMovie(req, res, next) {
    const id = req.params.id;
    const { title, overview, poster_path, popularity, tags } = req.body;

    axios({
      url: baseURL + `/movies/${id}`,
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

  static deleteMovie(req, res, next) {
    const id = req.params.id;

    axios({
      url: baseURL + `/movies/${id}`,
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

module.exports = MovieController;
