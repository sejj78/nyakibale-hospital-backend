const express = require('express');
const {
    getDailyTransactions,
    addDailyTransaction
} = require('../controllers/cashier_daily_transactionsController');
const router = express.Router();

router.get('/', getDailyTransactions);
router.post('/', addDailyTransaction);

module.exports = router;