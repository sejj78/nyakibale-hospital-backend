const express = require('express');
const router = express.Router();
const labReportLogsController = require('../controllers/labReportLogsController');

router.post('/', labReportLogsController.create);
router.get('/', labReportLogsController.getAll);
router.get('/:id', labReportLogsController.getById);
router.put('/:id', labReportLogsController.update);
router.delete('/:id', labReportLogsController.delete);

module.exports = router;