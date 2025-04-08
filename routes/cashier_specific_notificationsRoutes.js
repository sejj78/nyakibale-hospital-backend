const express = require('express');
const {
    getNotifications,
    addNotification
} = require('../controllers/cashier_specific_notificationsController');
const router = express.Router();

router.get('/', getNotifications);
router.post('/', addNotification);

module.exports = router;