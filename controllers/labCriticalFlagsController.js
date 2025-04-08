const db = require('../config/db');

const labCriticalFlagsController = {
  create(req, res) {
    const { result_id, critical_level, notes, flagged_by, flag_date, notify_doctor } = req.body;
    const query = `
      INSERT INTO lab_critical_flags 
      (result_id, critical_level, notes, flagged_by, flag_date, notify_doctor) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      result_id,
      critical_level,
      notes,
      flagged_by,
      flag_date || new Date(),
      notify_doctor || false
    ];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error inserting critical flag:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Critical flag added' });
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_critical_flags';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching critical flags:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.json(results);
    });
  },

  getById(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM lab_critical_flags WHERE flag_id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error fetching flag by ID:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Flag not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { id } = req.params;
    const { result_id, critical_level, notes, flagged_by, flag_date, notify_doctor } = req.body;
    const query = `
      UPDATE lab_critical_flags 
      SET result_id = ?, critical_level = ?, notes = ?, flagged_by = ?, flag_date = ?, notify_doctor = ?
      WHERE flag_id = ?
    `;
    const values = [
      result_id,
      critical_level,
      notes,
      flagged_by,
      flag_date,
      notify_doctor,
      id
    ];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error updating flag:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Flag not found' });
      }
      res.json({ message: 'Flag updated' });
    });
  },

  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_critical_flags WHERE flag_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Error deleting flag:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Flag not found' });
      }
      res.json({ message: 'Flag deleted' });
    });
  }
};

module.exports = labCriticalFlagsController;
