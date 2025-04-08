const db = require('../config/db');

const labReportLogsController = {
  create(req, res) {
    const { sample_id, patient_id, report_file_name, generated_by, generation_date } = req.body;
    
    const query = `
      INSERT INTO lab_report_logs (sample_id, patient_id, report_file_name, generated_by, generation_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [sample_id, patient_id, report_file_name, generated_by, generation_date || new Date()];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Insert Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Report log added' });
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_report_logs';

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
    const query = 'SELECT * FROM lab_report_logs WHERE report_id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Report log not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { id } = req.params;
    const { sample_id, patient_id, report_file_name, generated_by, generation_date } = req.body;
    const query = `
      UPDATE lab_report_logs
      SET sample_id = ?, patient_id = ?, report_file_name = ?, generated_by = ?, generation_date = ?
      WHERE report_id = ?
    `;
    const values = [sample_id, patient_id, report_file_name, generated_by, generation_date, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Report log not found' });
      }
      res.json({ message: 'Report log updated' });
    });
  },

  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_report_logs WHERE report_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Report log not found' });
      }
      res.json({ message: 'Report log deleted' });
    });
  }
};

module.exports = labReportLogsController;
