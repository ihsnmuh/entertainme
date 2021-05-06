const express = require('express');
const router = express.Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.findAll);
router.post('/', TvSeriesController.addTvSeries);
router.get('/:id', TvSeriesController.findById);
router.put('/:id', TvSeriesController.updateTvSeries);
router.delete('/:id', TvSeriesController.deleteTvSeries);

module.exports = router;
