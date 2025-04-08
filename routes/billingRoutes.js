const express = require('express');
const { getBilling, addBilling, updateBilling, deleteBilling } = require('../controllers/billingController');
const router = express.Router();

router.get('/', getBilling); // Fetch all billing records
router.post('/', addBilling); // Add a new billing record
router.put('/:id', updateBilling); // Update an existing billing record
router.delete('/:id', deleteBilling); // Delete a billing record

module.exports = router;