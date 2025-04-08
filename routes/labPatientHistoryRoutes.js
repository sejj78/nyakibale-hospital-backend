const express = require('express');
const router = express.Router();
const labPatientHistoryController = require('../controllers/labPatientHistoryController');

router.post('/', labPatientHistoryController.create);
router.get('/', labPatientHistoryController.getAll);
router.get('/:id', labPatientHistoryController.getById);
router.put('/:id', labPatientHistoryController.update);
router.delete('/:id', labPatientHistoryController.delete);

module.exports = router;