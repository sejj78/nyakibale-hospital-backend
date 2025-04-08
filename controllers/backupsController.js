const db = require('../config/db');

// Fetch backup history
exports.getBackupHistory = (req, res) => {
    db.query('SELECT * FROM backups', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching backup history' });
        }
        res.status(200).json(results);
    });
};

// Trigger a new backup
exports.triggerBackup = (req, res) => {
    const { backup_name, status } = req.body;
    const sql = 'INSERT INTO backups (backup_name, status) VALUES (?, ?)';
    db.query(sql, [backup_name, status], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error triggering backup' });
        }
        res.status(201).json({ message: 'Backup triggered successfully' });
    });
};