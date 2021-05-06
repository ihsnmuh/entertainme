const express = require('express');
const router = express.Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.findAll);
router.post('/', TvSeriesController.addTvSeries);

module.exports = router;
