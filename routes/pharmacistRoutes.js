const express = require('express');
const router = express.Router();
const pharmacistController = require('../controllers/pharmacistController');

// Routes for pharmacists
router.post('/', pharmacistController.createPharmacist); // Create a new pharmacist
router.get('/', pharmacistController.getAllPharmacists); // Get all pharmacists
router.get('/:id', pharmacistController.getPharmacistById); // Get a pharmacist by ID
router.put('/:id', pharmacistController.updatePharmacist); // Update a pharmacist
router.delete('/:id', pharmacistController.deletePharmacist); // Delete a pharmacist

module.exports = router;
