const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

// Get all mobile money transactions
exports.getMobileMoneyTransactions = async (req, res) => {
    const query = 'SELECT * FROM mobile_money_transactions';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Add a new mobile money transaction
exports.addMobileMoneyTransaction = async (req, res) => {
    const { transaction_id, patient_id, amount, status } = req.body;
    const query = 'INSERT INTO mobile_money_transactions (transaction_id, patient_id, amount, status) VALUES (?, ?, ?, ?)';
    db.query(query, [transaction_id, patient_id, amount, status], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Mobile money transaction added successfully', transactionId: results.insertId });
    });
};

// Update an existing mobile money transaction
exports.updateMobileMoneyTransaction = async (req, res) => {
    const { amount, status } = req.body;
    const query = 'UPDATE mobile_money_transactions SET amount = ?, status = ? WHERE id = ?';
    db.query(query, [amount, status, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json({ message: 'Mobile money transaction updated successfully' });
    });
};

// Delete a mobile money transaction
exports.deleteMobileMoneyTransaction = async (req, res) => {
    const query = 'DELETE FROM mobile_money_transactions WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json({ message: 'Mobile money transaction deleted successfully' });
    });
};