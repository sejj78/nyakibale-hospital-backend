const db = require('../config/db');

// Fetch all incidents
exports.getIncidents = (req, res) => {
    db.query('SELECT * FROM incidents', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching incidents' });
        }
        res.status(200).json(results);
    });
};

// Log a new incident
exports.logIncident = (req, res) => {
    const { description, severity, status } = req.body;
    const sql = 'INSERT INTO incidents (description, severity, status) VALUES (?, ?, ?)';
    db.query(sql, [description, severity, status], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging incident' });
        }
        res.status(201).json({ message: 'Incident logged successfully' });
    });
};

// Update an incident's status
exports.updateIncident = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const sql = 'UPDATE incidents SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating incident' });
        }
        res.status(200).json({ message: 'Incident updated successfully' });
    });
};