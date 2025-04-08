const db = require('../config/db');

// Get all refund logs
exports.getRefundLogs = async (req, res) => {
    const query = 'SELECT * FROM cashier_refund_logs';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Add a refund log
exports.addRefundLog = async (req, res) => {
    const { payment_id, refund_amount, reason } = req.body;
    const query = 'INSERT INTO cashier_refund_logs (payment_id, refund_amount, reason) VALUES (?, ?, ?)';
    db.query(query, [payment_id, refund_amount, reason], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Refund log added successfully', id: results.insertId });
    });
};