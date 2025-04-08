const db = require('../config/db');

const labEquipmentStatusController = {
  create(req, res) {
    const { equipment_name, status, last_updated, updated_by } = req.body;
    const query = `
      INSERT INTO lab_equipment_status (equipment_name, status, last_updated, updated_by)
      VALUES (?, ?, ?, ?)
    `;
    const values = [equipment_name, status, last_updated || new Date(), updated_by];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error inserting equipment status:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Equipment status added' });
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_equipment_status';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching equipment statuses:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.json(results);
    });
  },

  getById(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM lab_equipment_status WHERE equipment_id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error fetching equipment status by ID:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Equipment status not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { id } = req.params;
    const { equipment_name, status, last_updated, updated_by } = req.body;
    const query = `
      UPDATE lab_equipment_status
      SET equipment_name = ?, status = ?, last_updated = ?, updated_by = ?
      WHERE equipment_id = ?
    `;
    const values = [equipment_name, status, last_updated, updated_by, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error updating equipment status:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Equipment status not found' });
      }
      res.json({ message: 'Equipment status updated' });
    });
  },

  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_equipment_status WHERE equipment_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Error deleting equipment status:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Equipment status not found' });
      }
      res.json({ message: 'Equipment status deleted' });
    });
  }
};

module.exports = labEquipmentStatusController;
