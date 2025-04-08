const db = require('../config/db');

const labTestQueueController = {
  // Create a new test in the queue
  create(req, res) {
    const { sample_id, patient_id, test_type, status, request_date, technician_id } = req.body;
    const query = `
      INSERT INTO lab_test_queue (sample_id, patient_id, test_type, status, request_date, technician_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [sample_id, patient_id, test_type, status || 'Pending', request_date || new Date(), technician_id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Insert Error:', error);
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Test added to queue' });
    });
  },

  // Get all tests in the queue
  getAll(req, res) {
    const query = 'SELECT * FROM lab_test_queue';

    db.query(query, (error, rows) => {
      if (error) {
        console.error('Fetch Error:', error);
        return res.status(500).json({ error: error.message });
      }
      res.json(rows);
    });
  },

  // Get a specific test by ID
  getById(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM lab_test_queue WHERE test_id = ?';

    db.query(query, [id], (error, rows) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: error.message });
      }
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Test not found' });
      }
      res.json(rows[0]);
    });
  },

  // Update a test in the queue
  update(req, res) {
    const { id } = req.params;
    const { sample_id, patient_id, test_type, status, request_date, technician_id } = req.body;
    const query = `
      UPDATE lab_test_queue
      SET sample_id = ?, patient_id = ?, test_type = ?, status = ?, request_date = ?, technician_id = ?
      WHERE test_id = ?
    `;
    const values = [sample_id, patient_id, test_type, status, request_date, technician_id, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Test not found' });
      }
      res.json({ message: 'Test updated' });
    });
  },

  // Delete a test from the queue
  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_test_queue WHERE test_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Test not found' });
      }
      res.json({ message: 'Test deleted' });
    });
  }
};

module.exports = labTestQueueController;
