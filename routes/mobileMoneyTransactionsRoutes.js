const express = require('express');
const {
    getMobileMoneyTransactions,
    addMobileMoneyTransaction,
    updateMobileMoneyTransaction,
    deleteMobileMoneyTransaction
} = require('../controllers/mobileMoneyTransactionsController');
const router = express.Router();

router.get('/', getMobileMoneyTransactions); // Fetch all transactions
router.post('/', addMobileMoneyTransaction); // Add a new transaction
router.put('/:id', updateMobileMoneyTransaction); // Update an existing transaction
router.delete('/:id', deleteMobileMoneyTransaction); // Delete a transaction

module.exports = router;