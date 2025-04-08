const express = require('express');
const { getRoleNotifications, addRoleNotification } = require('../controllers/roleNotificationsController');
const router = express.Router();

// Verify that the imported controller functions are defined
router.get('/', getRoleNotifications); // Fetch role-based notifications
router.post('/', addRoleNotification); // Add a new role-based notification

module.exports = router;