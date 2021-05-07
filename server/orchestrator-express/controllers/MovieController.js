// const Movie = require('../models/movie');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const baseURL = 'http://localhost:4001';

class MovieController {
  static findAll(req, res, next) {
    // Cek ada data atau tidak di redis
    redis.get('movies').then((result) => {
      // Jika tidak ada data
      if (!result) {
        // Lakukan Request ke server
        console.log('ORCHESTRATOR MEMINTA DATA MOVIES DARI SERVICES');
        axios({
          url: baseURL + '/movies',
          method: 'GET',
        })
          .then(({ data }) => {
            // simpan data yang didapat kedalam Redis
            redis.set('movies', JSON.stringify(data));
            // kemudian mengembalikan respon ke layar
            res.status(200).json(data);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        // Jika data Redis ada data
        console.log('ORCHESTRATOR KIRIM DATA MOVIES DARI REDIS');
        const data = JSON.parse(result);
        res.status(200).json(data);
      }
    });
  }

  // Ketika melakukan Update data makan redis di reset kembali

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
        redis.del('movies');
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
        redis.del('movies');
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
        redis.del('movies');
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = MovieController;
