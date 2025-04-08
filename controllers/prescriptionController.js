// controllers/prescriptionController.js
const db = require('../config/db');

// Create a new prescription
const createPrescription = async (req, res) => {
  const { patient_id, pharmacist_id, medicine_name, dosage, duration, prescription_date } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO prescriptions (patient_id, pharmacist_id, medicine_name, dosage, duration, prescription_date) VALUES (?, ?, ?, ?, ?, ?)',
      [patient_id, pharmacist_id, medicine_name, dosage, duration, prescription_date]
    );
    res.status(201).json({ id: result.insertId, medicine_name, dosage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all prescriptions
const getPrescriptions = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM prescriptions');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPrescription, getPrescriptions };
