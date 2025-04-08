const db = require("../config/db");

const labTestResultsController = {
  // Create a new test result
  create(req, res) {
    const { test_id, sample_id, patient_id, test_type, result_details, result_status, completion_date, technician_id } = req.body;
    const query = `
      INSERT INTO lab_test_results (test_id, sample_id, patient_id, test_type, result_details, result_status, completion_date, technician_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [test_id, sample_id, patient_id, test_type, result_details, result_status, completion_date || new Date(), technician_id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Insert Error:', error);
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Test result added' });
    });
  },

  // Get all test results
  getAll(req, res) {
    const query = 'SELECT * FROM lab_test_results';

    db.query(query, (error, rows) => {
      if (error) {
        console.error('Fetch Error:', error);
        return res.status(500).json({ error: error.message });
      }
      res.json(rows);
    });
  },

  // Get a specific test result by ID
  getById(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM lab_test_results WHERE result_id = ?';

    db.query(query, [id], (error, rows) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: error.message });
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Result not found' });
      }
      res.json(rows[0]);
    });
  },

  // Update a test result
  update(req, res) {
    const { id } = req.params;
    const { test_id, sample_id, patient_id, test_type, result_details, result_status, completion_date, technician_id } = req.body;
    const query = `
      UPDATE lab_test_results
      SET test_id = ?, sample_id = ?, patient_id = ?, test_type = ?, result_details = ?, result_status = ?, completion_date = ?, technician_id = ?
      WHERE result_id = ?
    `;
    const values = [test_id, sample_id, patient_id, test_type, result_details, result_status, completion_date, technician_id, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Result not found' });
      }
      res.json({ message: 'Result updated' });
    });
  },

  // Delete a test result
  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_test_results WHERE result_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Result not found' });
      }
      res.json({ message: 'Result deleted' });
    });
  }
};

module.exports = labTestResultsController;
