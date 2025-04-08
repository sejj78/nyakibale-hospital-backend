const express = require('express');
const {
    getPayments,
    addPayment,
    updatePayment,
    deletePayment
} = require('../controllers/payments_handled_by_cashierController');
const router = express.Router();

router.get('/', getPayments);
router.post('/', addPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;