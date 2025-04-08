const express = require('express');
const { getIncidents, logIncident, updateIncident } = require('../controllers/incidentsController');
const router = express.Router();

router.get('/', getIncidents); // Fetch all incidents
router.post('/', logIncident); // Log a new incident
router.put('/:id', updateIncident); // Update an incident's status

module.exports = router;