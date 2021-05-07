const express = require('express');
const router = express.Router();
const OrchestratorController = require('../controllers/OrchestratorController');

router.get('/', OrchestratorController.findAll);

module.exports = router;
