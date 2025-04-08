const express = require('express');
const router = express.Router();
const {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin
} = require('../controllers/adminUserController');

// Debug log to verify imports
console.log('[DEBUG] Admin routes loaded');

// Admin users routes
router.get('/', getAdmins);
router.post('/', addAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

module.exports = router;