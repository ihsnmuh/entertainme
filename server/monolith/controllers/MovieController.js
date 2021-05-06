const Movie = require('../models/movie');

class MovieController {
  static async findAll(req, res) {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
    }
  }

  static async addMovie(req, res) {
    try {
      const newMovie = req.body;
      const movieInput = await Movie.addMovie(newMovie);
      res.status(201).json(movieInput);
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(req, res) {
    try {
      const id = req.params.id;
      // console.log(id);
      const movieFound = await Movie.findById(id);
      res.status(200).json(movieFound);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateMovie(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      // console.log(data);
      const dataUpdate = await Movie.updateMovie(id, data);
      res.status(200).json(dataUpdate);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMovie(req, res) {
    try {
      const id = req.params.id;
      const deletedMovie = await Movie.deleteMovie(id);
      res.status(200).json(deletedMovie);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MovieController;
