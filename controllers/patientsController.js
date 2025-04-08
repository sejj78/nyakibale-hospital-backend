const db = require("../config/db"); // Import database connection

// Add a new patient
exports.addPatient = async (req, res) => {
  const { name, contact, insurance, medical_history, demographic_data } = req.body;
  try {
    await db.query(
      "INSERT INTO patients (name, contact, insurance, medical_history, demographic_data) VALUES (?, ?, ?, ?, ?)",
      [name, contact, insurance, medical_history, demographic_data]
    );
    res.status(201).send({ message: "Patient added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding patient", error });
  }
};

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM patients");
    res.status(200).send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching patients", error });
  }
};

// Update an existing patient
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, contact, insurance, medical_history, demographic_data } = req.body;
  try {
    await db.query(
      "UPDATE patients SET name = ?, contact = ?, insurance = ?, medical_history = ?, demographic_data = ? WHERE patient_id = ?",
      [name, contact, insurance, medical_history, demographic_data, id]
    );
    res.status(200).send({ message: "Patient updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating patient", error });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM patients WHERE patient_id = ?", [id]);
    res.status(200).send({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting patient", error });
  }
};