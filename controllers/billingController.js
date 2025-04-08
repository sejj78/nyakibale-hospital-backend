const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

exports.getBilling = async (req, res) => {
    const query = 'SELECT * FROM billing';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.addBilling = async (req, res) => {
    const { patient_id, total_amount, amount_paid, status } = req.body;
    const query = 'INSERT INTO billing (patient_id, total_amount, amount_paid, status) VALUES (?, ?, ?, ?)';
    db.query(query, [patient_id, total_amount, amount_paid, status], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Billing record added successfully', billingId: results.insertId });
    });
};

exports.updateBilling = async (req, res) => {
    const { total_amount, amount_paid, status } = req.body;
    const query = 'UPDATE billing SET total_amount = ?, amount_paid = ?, status = ? WHERE id = ?';
    db.query(query, [total_amount, amount_paid, status, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Billing record not found' });
        res.status(200).json({ message: 'Billing record updated successfully' });
    });
};

exports.deleteBilling = async (req, res) => {
    const query = 'DELETE FROM billing WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Billing record not found' });
        res.status(200).json({ message: 'Billing record deleted successfully' });
    });
};