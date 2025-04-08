const db = require("../config/db");

// Fetch all role-based notifications
const getNotifications = (req, res) => {
  const query = "SELECT * FROM notifications ORDER BY sent_time DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      res.status(500).json({ 
        success: false,
        message: "Failed to fetch notifications",
        error: err.message 
      });
    } else {
      // Format the results to match frontend expectations
      const formattedNotifications = results.map(notification => ({
        id: notification.id,
        role: notification.role,
        message: notification.message,
        sentTime: notification.sent_time,
        status: notification.status || 'Sent'
      }));
      
      res.status(200).json({
        success: true,
        data: formattedNotifications
      });
    }
  });
};

// Add a new role-based notification
const addNotification = (req, res) => {
  const { role, message } = req.body;
  
  if (!role || !message) {
    return res.status(400).json({
      success: false,
      message: "Role and message are required fields"
    });
  }

  const query = `
    INSERT INTO notifications (role, message, sent_time, status) 
    VALUES (?, ?, NOW(), 'Sent')
  `;
  
  db.query(query, [role, message], (err, result) => {
    if (err) {
      console.error("Error adding notification:", err);
      res.status(500).json({
        success: false,
        message: "Failed to send notification",
        error: err.message
      });
    } else {
      // Return the complete notification object
      const newNotification = {
        id: result.insertId,
        role,
        message,
        sentTime: new Date().toISOString(),
        status: 'Sent'
      };
      
      res.status(201).json({
        success: true,
        message: "Notification sent successfully",
        data: newNotification
      });
    }
  });
};

// Update a notification
const updateNotification = (req, res) => {
  const { id } = req.params;
  const { role, message, status } = req.body;

  const query = `
    UPDATE notifications 
    SET role = ?, message = ?, status = ?
    WHERE id = ?
  `;
  
  db.query(query, [role, message, status, id], (err, result) => {
    if (err) {
      console.error("Error updating notification:", err);
      res.status(500).json({
        success: false,
        message: "Failed to update notification",
        error: err.message
      });
    } else if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Notification updated successfully"
      });
    }
  });
};

// Delete a notification
const deleteNotification = (req, res) => {
  const { id } = req.params;
  
  const query = "DELETE FROM notifications WHERE id = ?";
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting notification:", err);
      res.status(500).json({
        success: false,
        message: "Failed to delete notification",
        error: err.message
      });
    } else if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Notification deleted successfully"
      });
    }
  });
};

module.exports = { 
  getNotifications, 
  addNotification, 
  updateNotification, 
  deleteNotification 
};