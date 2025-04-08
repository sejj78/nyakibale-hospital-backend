const express = require('express');
const { getBackupHistory, triggerBackup } = require('../controllers/backupsController');
const router = express.Router();

router.get('/', getBackupHistory); // Fetch backup history
router.post('/', triggerBackup); // Trigger a new backup

module.exports = router;