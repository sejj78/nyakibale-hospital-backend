const express = require('express');
const { getAudits, addAudit } = require('../controllers/auditsController');
const router = express.Router();

router.get('/', getAudits); // Fetch all audit logs
router.post('/', addAudit); // Add a new audit log

module.exports = router;