const express = require('express');
const {
    getRefundLogs,
    addRefundLog
} = require('../controllers/cashier_refund_logsController');
const router = express.Router();

router.get('/', getRefundLogs);
router.post('/', addRefundLog);

module.exports = router;