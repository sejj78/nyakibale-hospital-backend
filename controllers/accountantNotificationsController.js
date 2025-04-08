const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

// Get all notifications
exports.getNotifications = async (req, res) => {
    const query = 'SELECT * FROM accountant_notifications';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Add a new notification
exports.addNotification = async (req, res) => {
    const { role, message } = req.body;
    const query = 'INSERT INTO accountant_notifications (role, message) VALUES (?, ?)';
    db.query(query, [role, message], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Notification added successfully', notificationId: results.insertId });
    });
};

// Update an existing notification
exports.updateNotification = async (req, res) => {
    const { message } = req.body;
    const query = 'UPDATE accountant_notifications SET message = ? WHERE id = ?';
    db.query(query, [message, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Notification updated successfully' });
    });
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    const query = 'DELETE FROM accountant_notifications WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Notification deleted successfully' });
    });
};