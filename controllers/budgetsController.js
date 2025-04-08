const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

exports.getBudgets = async (req, res) => {
    const query = 'SELECT * FROM budgets';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.addBudget = async (req, res) => {
    const { department, allocated, spent } = req.body;
    const query = 'INSERT INTO budgets (department, allocated, spent) VALUES (?, ?, ?)';
    db.query(query, [department, allocated, spent], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Budget added successfully', budgetId: results.insertId });
    });
};

exports.updateBudget = async (req, res) => {
    const { department, allocated, spent } = req.body;
    const query = 'UPDATE budgets SET department = ?, allocated = ?, spent = ? WHERE id = ?';
    db.query(query, [department, allocated, spent, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Budget not found' });
        res.status(200).json({ message: 'Budget updated successfully' });
    });
};

exports.deleteBudget = async (req, res) => {
    const query = 'DELETE FROM budgets WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Budget not found' });
        res.status(200).json({ message: 'Budget deleted successfully' });
    });
};