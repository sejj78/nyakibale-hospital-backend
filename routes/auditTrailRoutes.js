const express = require("express");
const { getAuditTrail, addAuditRecord } = require("../controllers/auditTrailController");
const router = express.Router();

// Route to fetch audit trail
router.get("/", getAuditTrail);

// Route to add a new audit record
router.post("/", addAuditRecord);

module.exports = router;