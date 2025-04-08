const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

exports.getFinancialReports = async (req, res) => {
    const query = 'SELECT * FROM financial_reports';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.addFinancialReport = async (req, res) => {
    const { department, total_revenue, total_expenses, report_date } = req.body;
    const query = 'INSERT INTO financial_reports (department, total_revenue, total_expenses, report_date) VALUES (?, ?, ?, ?)';
    db.query(query, [department, total_revenue, total_expenses, report_date], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Financial report added successfully', reportId: results.insertId });
    });
};

exports.deleteFinancialReport = async (req, res) => {
    const query = 'DELETE FROM financial_reports WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Financial report not found' });
        res.status(200).json({ message: 'Financial report deleted successfully' });
    });
};