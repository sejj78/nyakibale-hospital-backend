const db = require('../config/db');

const labSampleTrackingController = {
  create(req, res) {
    const { sample_id, patient_id, test_type, status, collection_date, technician_id } = req.body;
    const query = `
      INSERT INTO lab_sample_tracking (sample_id, patient_id, test_type, status, collection_date, technician_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [sample_id, patient_id, test_type, status, collection_date, technician_id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Insert Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Sample added' });
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_sample_tracking';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Fetch Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.json(results);
    });
  },

  getById(req, res) {
    const { sample_id } = req.params;
    const query = 'SELECT * FROM lab_sample_tracking WHERE sample_id = ?';

    db.query(query, [sample_id], (error, results) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Sample not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { sample_id } = req.params;
    const { patient_id, test_type, status, collection_date, technician_id } = req.body;
    const query = `
      UPDATE lab_sample_tracking
      SET patient_id = ?, test_type = ?, status = ?, collection_date = ?, technician_id = ?
      WHERE sample_id = ?
    `;
    const values = [patient_id, test_type, status, collection_date, technician_id, sample_id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sample not found' });
      }
      res.json({ message: 'Sample updated' });
    });
  },

  delete(req, res) {
    const { sample_id } = req.params;
    const query = 'DELETE FROM lab_sample_tracking WHERE sample_id = ?';

    db.query(query, [sample_id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sample not found' });
      }
      res.json({ message: 'Sample deleted' });
    });
  }
};

module.exports = labSampleTrackingController;
