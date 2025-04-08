const express = require('express');
const router = express.Router();
const labBarcodeScansController = require('../controllers/labBarcodeScansController');

router.post('/', labBarcodeScansController.create);
router.get('/', labBarcodeScansController.getAll);
router.get('/:id', labBarcodeScansController.getById);
router.put('/:id', labBarcodeScansController.update);
router.delete('/:id', labBarcodeScansController.delete);

module.exports = router;