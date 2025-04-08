const express = require('express');
const router = express.Router();
const labCriticalFlagsController = require('../controllers/labCriticalFlagsController');

router.post('/', labCriticalFlagsController.create);
router.get('/', labCriticalFlagsController.getAll);
router.get('/:id', labCriticalFlagsController.getById);
router.put('/:id', labCriticalFlagsController.update);
router.delete('/:id', labCriticalFlagsController.delete);

module.exports = router;