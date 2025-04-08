const express = require('express');
const { getCapacityMetrics } = require('../controllers/capacityController');
const router = express.Router();

router.get('/', getCapacityMetrics); // Fetch system metrics

module.exports = router;