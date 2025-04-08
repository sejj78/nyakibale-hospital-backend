const db = require('../config/db');

// Get all daily transactions
exports.getDailyTransactions = async (req, res) => {
    const query = 'SELECT * FROM cashier_daily_transactions';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Add a daily transaction
exports.addDailyTransaction = async (req, res) => {
    const { total_received, total_refunded, date } = req.body;
    const query = 'INSERT INTO cashier_daily_transactions (total_received, total_refunded, date) VALUES (?, ?, ?)';
    db.query(query, [total_received, total_refunded, date], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Transaction added successfully', id: results.insertId });
    });
};