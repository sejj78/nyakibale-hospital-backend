const express = require('express');
const router = express.Router();
const labTechnicianActionsController = require('../controllers/labTechnicianActionsController');

router.post('/', labTechnicianActionsController.create);
router.get('/', labTechnicianActionsController.getAll);
router.get('/:id', labTechnicianActionsController.getById);
router.put('/:id', labTechnicianActionsController.update);
router.delete('/:id', labTechnicianActionsController.delete);

module.exports = router;