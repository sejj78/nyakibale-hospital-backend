const db = require('../config/db');

// Get all receipts
exports.getReceipts = async (req, res) => {
    const query = 'SELECT * FROM issued_receipts';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Add a new receipt
exports.addReceipt = async (req, res) => {
    const { payment_id, receipt_number } = req.body;
    const query = 'INSERT INTO issued_receipts (payment_id, receipt_number) VALUES (?, ?)';
    db.query(query, [payment_id, receipt_number], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Receipt added successfully', id: results.insertId });
    });
};