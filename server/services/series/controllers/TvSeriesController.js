const TvSeries = require('../models/tvseries');

class TvSeriesController {
  static async findAll(req, res, next) {
    try {
      const tvseries = await TvSeries.findAll();
      res.status(200).json(tvseries);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addTvSeries(req, res, next) {
    try {
      const newTvSeries = req.body;
      const TvSeriesInput = await TvSeries.addTvSeries(newTvSeries);
      res.status(201).json(TvSeriesInput);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id;
      // console.log(id);
      const TvSeriesFound = await TvSeries.findById(id);
      res.status(200).json(TvSeriesFound);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: 'TV Series not found' });
    }
  }

  static async updateTvSeries(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      // console.log(data);
      const dataUpdate = await TvSeries.updateTvSeries(id, data);
      if (dataUpdate.value === null) {
        throw { name: 'NotFound' };
      } else {
        res.status(200).json(dataUpdate);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteTvSeries(req, res, next) {
    try {
      const id = req.params.id;
      const deletedTvSeries = await TvSeries.deleteTvSeries(id);
      if (deletedTvSeries.value === null) {
        throw { name: 'NotFounds' };
      } else {
        res.status(200).json(deletedTvSeries);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TvSeriesController;
