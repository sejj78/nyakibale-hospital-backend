const db = require('../config/db');

const labTechnicianActionsController = {
  create(req, res) {
    const { technician_id, action_type, related_id, action_date } = req.body;
    const query = `
      INSERT INTO lab_technician_actions (technician_id, action_type, related_id, action_date)
      VALUES (?, ?, ?, ?)
    `;
    const values = [technician_id, action_type, related_id, action_date || new Date()];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Insert Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Action added' });
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_technician_actions';

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
    const query = 'SELECT * FROM lab_technician_actions WHERE action_id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { id } = req.params;
    const { technician_id, action_type, related_id, action_date } = req.body;
    const query = `
      UPDATE lab_technician_actions
      SET technician_id = ?, action_type = ?, related_id = ?, action_date = ?
      WHERE action_id = ?
    `;
    const values = [technician_id, action_type, related_id, action_date, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.json({ message: 'Action updated' });
    });
  },

  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_technician_actions WHERE action_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.json({ message: 'Action deleted' });
    });
  }
};

module.exports = labTechnicianActionsController;
