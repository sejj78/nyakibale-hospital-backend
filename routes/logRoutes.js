const express = require("express");
const { getLogs, addLog } = require("../controllers/logRoutesController");
const router = express.Router();

// Route to fetch logs
router.get("/", getLogs);

// Route to add a new log
router.post("/", addLog);

module.exports = router;