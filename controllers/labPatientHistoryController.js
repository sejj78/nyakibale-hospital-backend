const db = require('../config/db');

const labPatientHistoryController = {
  create(req, res) {
    const { patient_id, test_id, test_type, result_summary, test_date, status } = req.body;
    
    const query = `
      INSERT INTO lab_patient_history (patient_id, test_id, test_type, result_summary, test_date, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [patient_id, test_id, test_type, result_summary, test_date, status];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Insert Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Patient history added' });
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_patient_history';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Fetch Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.json(results);
    });
  },

  getById(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM lab_patient_history WHERE history_id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'History not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { id } = req.params;
    const { patient_id, test_id, test_type, result_summary, test_date, status } = req.body;
    const query = `
      UPDATE lab_patient_history
      SET patient_id = ?, test_id = ?, test_type = ?, result_summary = ?, test_date = ?, status = ?
      WHERE history_id = ?
    `;
    const values = [patient_id, test_id, test_type, result_summary, test_date, status, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'History not found' });
      }
      res.json({ message: 'History updated' });
    });
  },

  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_patient_history WHERE history_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'History not found' });
      }
      res.json({ message: 'History deleted' });
    });
  }
};

module.exports = labPatientHistoryController;
