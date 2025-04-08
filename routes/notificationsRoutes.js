const express = require("express");
const router = express.Router();
const { 
  getNotifications, 
  addNotification, 
  updateNotification, 
  deleteNotification 
} = require("../controllers/notificationsController");

// Routes for notifications
router.get("/", getNotifications); // Fetch all notifications
router.post("/", addNotification); // Add new notification
router.put("/:id", updateNotification); // Update notification
router.delete("/:id", deleteNotification); // Delete notification

module.exports = router;