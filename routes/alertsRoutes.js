const express = require("express");
const { getAlerts, addAlert } = require("../controllers/alertsController");
const router = express.Router();

// Route to fetch alerts
router.get("/", getAlerts);

// Route to add a new alert
router.post("/", addAlert);

module.exports = router;