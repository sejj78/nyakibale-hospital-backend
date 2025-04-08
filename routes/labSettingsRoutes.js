const express = require('express');
const router = express.Router();
const labSettingsController = require('../controllers/labSettingsController');

router.post('/', labSettingsController.create);
router.get('/', labSettingsController.getAll);
router.get('/:id', labSettingsController.getById);
router.put('/:id', labSettingsController.update);
router.delete('/:id', labSettingsController.delete);

module.exports = router;