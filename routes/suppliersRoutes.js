const express = require('express');
const { getSuppliers, addSupplier, updateSupplier, deleteSupplier } = require('../controllers/suppliersController');
const router = express.Router();

router.get('/', getSuppliers); // Fetch all supplier records
router.post('/', addSupplier); // Add a new supplier record
router.put('/:id', updateSupplier); // Update a supplier record
router.delete('/:id', deleteSupplier); // Delete a supplier record

module.exports = router;