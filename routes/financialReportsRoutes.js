const express = require('express');
const { getFinancialReports, addFinancialReport, deleteFinancialReport } = require('../controllers/financialReportsController');
const router = express.Router();

router.get('/', getFinancialReports); // Fetch all financial reports
router.post('/', addFinancialReport); // Add a new financial report
router.delete('/:id', deleteFinancialReport); // Delete a financial report

module.exports = router;