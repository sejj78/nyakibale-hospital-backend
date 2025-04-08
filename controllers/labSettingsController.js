const db = require('../config/db');

const labSettingsController = {
  create(req, res) {
    const { technician_id, setting_key, setting_value, last_updated } = req.body;

    // Check if the setting already exists
    const checkQuery = `
      SELECT * FROM lab_settings 
      WHERE technician_id = ? AND setting_key = ?
    `;
    const checkValues = [technician_id, setting_key];

    db.query(checkQuery, checkValues, (checkError, checkResult) => {
      if (checkError) {
        console.error('Check Error:', checkError);
        return res.status(500).json({ error: 'Something went wrong: ' + checkError.message });
      }

      if (checkResult.length > 0) {
        // If the setting exists, update it
        const updateQuery = `
          UPDATE lab_settings
          SET setting_value = ?, last_updated = ?
          WHERE technician_id = ? AND setting_key = ?
        `;
        const updateValues = [setting_value, last_updated || new Date(), technician_id, setting_key];

        db.query(updateQuery, updateValues, (updateError, updateResult) => {
          if (updateError) {
            console.error('Update Error:', updateError);
            return res.status(500).json({ error: 'Something went wrong: ' + updateError.message });
          }
          res.json({ message: 'Setting updated successfully' });
        });
      } else {
        // If the setting doesn't exist, insert a new one
        const insertQuery = `
          INSERT INTO lab_settings (technician_id, setting_key, setting_value, last_updated)
          VALUES (?, ?, ?, ?)
        `;
        const insertValues = [technician_id, setting_key, setting_value, last_updated || new Date()];

        db.query(insertQuery, insertValues, (insertError, insertResult) => {
          if (insertError) {
            console.error('Insert Error:', insertError);
            return res.status(500).json({ error: 'Something went wrong: ' + insertError.message });
          }
          res.status(201).json({ id: insertResult.insertId, message: 'Setting added successfully' });
        });
      }
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_settings';

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
    const query = 'SELECT * FROM lab_settings WHERE setting_id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { id } = req.params;
    const { technician_id, setting_key, setting_value, last_updated } = req.body;
    const query = `
      UPDATE lab_settings
      SET technician_id = ?, setting_key = ?, setting_value = ?, last_updated = ?
      WHERE setting_id = ?
    `;
    const values = [technician_id, setting_key, setting_value, last_updated, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      res.json({ message: 'Setting updated' });
    });
  },

  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_settings WHERE setting_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      res.json({ message: 'Setting deleted' });
    });
  }
};

module.exports = labSettingsController;
