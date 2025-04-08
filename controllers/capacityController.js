const db = require('../config/db');

// Fetch system metrics
exports.getCapacityMetrics = (req, res) => {
    db.query('SELECT * FROM capacity', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching capacity metrics' });
        }
        res.status(200).json(results);
    });
};