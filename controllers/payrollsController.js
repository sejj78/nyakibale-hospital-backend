const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

exports.getPayrolls = async (req, res) => {
    const query = 'SELECT * FROM payrolls';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.addPayroll = async (req, res) => {
    const { employee_name, role, salary, status } = req.body;
    const query = 'INSERT INTO payrolls (employee_name, role, salary, status) VALUES (?, ?, ?, ?)';
    db.query(query, [employee_name, role, salary, status], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Payroll added successfully', payrollId: results.insertId });
    });
};

exports.updatePayroll = async (req, res) => {
    const { employee_name, role, salary, status } = req.body;
    const query = 'UPDATE payrolls SET employee_name = ?, role = ?, salary = ?, status = ? WHERE id = ?';
    db.query(query, [employee_name, role, salary, status, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Payroll not found' });
        res.status(200).json({ message: 'Payroll updated successfully' });
    });
};

exports.deletePayroll = async (req, res) => {
    const query = 'DELETE FROM payrolls WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Payroll not found' });
        res.status(200).json({ message: 'Payroll deleted successfully' });
    });
};