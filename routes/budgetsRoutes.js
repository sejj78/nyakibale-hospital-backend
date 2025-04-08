const express = require('express');
const { getBudgets, addBudget, updateBudget, deleteBudget } = require('../controllers/budgetsController');
const router = express.Router();

router.get('/', getBudgets); // Fetch all budgets
router.post('/', addBudget); // Add a new budget
router.put('/:id', updateBudget); // Update an existing budget
router.delete('/:id', deleteBudget); // Delete a budget

module.exports = router;