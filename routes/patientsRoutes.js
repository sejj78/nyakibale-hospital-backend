const express = require("express");
const router = express.Router();
const patientsController = require('../controllers/patientsController');

// Route to add a new patient
router.post("/", patientsController.addPatient);

// Route to fetch all patients
router.get("/", patientsController.getPatients);

// Route to update a patient
router.put("/:id", patientsController.updatePatient);

// Route to delete a patient
router.delete("/:id", patientsController.deletePatient);

module.exports = router;
