const TvSeries = require('../models/tvseries');

class TvSeriesController {
  static async findAll(req, res) {
    try {
      const tvseries = await TvSeries.findAll();
      res.status(200).json(tvseries);
    } catch (error) {
      console.log(error);
    }
  }

  static async addTvSeries(req, res) {
    try {
      const newTvSeries = req.body;
      const TvSeriesInput = await TvSeries.addMovie(newTvSeries);
      res.status(201).json(TvSeriesInput);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TvSeriesController;
