const db = require('../config/db');

// Fetch audit trail logs
exports.getAuditTrail = (req, res) => {
    db.query('SELECT * FROM audit_trail', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching audit trail' });
        }
        res.status(200).json(results);
    });
};

// Log a new action
exports.logAuditAction = (req, res) => {
    const { user_id, action, affected_table } = req.body;
    const sql = 'INSERT INTO audit_trail (user_id, action, affected_table) VALUES (?, ?, ?)';
    db.query(sql, [user_id, action, affected_table], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging audit action' });
        }
        res.status(201).json({ message: 'Audit action logged successfully' });
    });
};