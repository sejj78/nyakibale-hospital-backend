const db = require('../config/db');

const labBarcodeScansController = {
  create(req, res) {
    const { barcode, sample_id, scanned_by, scan_date } = req.body;

    const query = `
      INSERT INTO lab_barcode_scans (barcode, sample_id, scanned_by, scan_date)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      barcode,
      sample_id,
      scanned_by,
      scan_date || new Date()
    ];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Insert Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      res.status(201).json({ id: result.insertId, message: 'Barcode scan added' });
    });
  },

  getAll(req, res) {
    const query = 'SELECT * FROM lab_barcode_scans';

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
    const query = 'SELECT * FROM lab_barcode_scans WHERE scan_id = ?';

    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Fetch by ID Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Scan not found' });
      }
      res.json(results[0]);
    });
  },

  update(req, res) {
    const { id } = req.params;
    const { barcode, sample_id, scanned_by, scan_date } = req.body;
    const query = `
      UPDATE lab_barcode_scans
      SET barcode = ?, sample_id = ?, scanned_by = ?, scan_date = ?
      WHERE scan_id = ?
    `;
    const values = [barcode, sample_id, scanned_by, scan_date, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Update Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Scan not found' });
      }
      res.json({ message: 'Scan updated' });
    });
  },

  delete(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lab_barcode_scans WHERE scan_id = ?';

    db.query(query, [id], (error, result) => {
      if (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({ error: 'Something went wrong: ' + error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Scan not found' });
      }
      res.json({ message: 'Scan deleted' });
    });
  }
};

module.exports = labBarcodeScansController;
