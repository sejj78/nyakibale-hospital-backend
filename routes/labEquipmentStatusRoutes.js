const express = require('express');
const router = express.Router();
const labEquipmentStatusController = require('../controllers/labEquipmentStatusController');

router.post('/', labEquipmentStatusController.create);
router.get('/', labEquipmentStatusController.getAll);
router.get('/:id', labEquipmentStatusController.getById);
router.put('/:id', labEquipmentStatusController.update);
router.delete('/:id', labEquipmentStatusController.delete);

module.exports = router;