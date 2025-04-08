const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

exports.getAudits = async (req, res) => {
    const query = 'SELECT * FROM audits';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.addAudit = async (req, res) => {
    const { action, performed_by } = req.body;
    const query = 'INSERT INTO audits (action, performed_by) VALUES (?, ?)';
    db.query(query, [action, performed_by], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Audit log added successfully', auditId: results.insertId });
    });
};