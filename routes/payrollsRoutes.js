const express = require('express');
const { getPayrolls, addPayroll, updatePayroll, deletePayroll } = require('../controllers/payrollsController');
const router = express.Router();

router.get('/', getPayrolls); // Fetch all payrolls
router.post('/', addPayroll); // Add a new payroll
router.put('/:id', updatePayroll); // Update an existing payroll
router.delete('/:id', deletePayroll); // Delete a payroll

module.exports = router;