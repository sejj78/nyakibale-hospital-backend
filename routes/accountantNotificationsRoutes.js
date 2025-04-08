const express = require('express');
const { getNotifications, addNotification, deleteNotification } = require('../controllers/accountantNotificationsController');
const router = express.Router();

router.get('/', getNotifications); // Fetch all notifications
router.post('/', addNotification); // Add a new notification
router.delete('/:id', deleteNotification); // Delete a notification

module.exports = router;