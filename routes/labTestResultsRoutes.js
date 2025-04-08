const express = require('express');
const router = express.Router();
const labTestResultsController = require('../controllers/labTestResultsController');

router.post('/', labTestResultsController.create);
router.get('/', labTestResultsController.getAll);
router.get('/:id', labTestResultsController.getById);
router.put('/:id', labTestResultsController.update);
router.delete('/:id', labTestResultsController.delete);

module.exports = router;