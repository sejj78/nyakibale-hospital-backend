const db = require('../config/db');

// Fetch role-based notifications
exports.getRoleNotifications = (req, res) => {
    db.query('SELECT * FROM role_notifications', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching role notifications' });
        }
        res.status(200).json(results);
    });
};

// Add a new role-based notification
exports.addRoleNotification = (req, res) => {
    const { role, message } = req.body;
    const sql = 'INSERT INTO role_notifications (role, message) VALUES (?, ?)';
    db.query(sql, [role, message], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error adding role notification' });
        }
        res.status(201).json({ message: 'Role notification added successfully' });
    });
};