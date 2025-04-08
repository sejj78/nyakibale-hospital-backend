const db = require('../config/db');

// Get all notifications
exports.getNotifications = async (req, res) => {
    const query = 'SELECT * FROM cashier_specific_notifications';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Add a notification
exports.addNotification = async (req, res) => {
    const { role, message } = req.body;
    const query = 'INSERT INTO cashier_specific_notifications (role, message) VALUES (?, ?)';
    db.query(query, [role, message], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Notification added successfully', id: results.insertId });
    });
};