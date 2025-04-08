const express = require('express');
const { getAuditTrail, logAuditAction } = require('../controllers/auditController');
const router = express.Router();

router.get('/', getAuditTrail); // Fetch audit trail logs
router.post('/', logAuditAction); // Log a new action

module.exports = router;