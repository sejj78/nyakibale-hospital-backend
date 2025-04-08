const express = require('express');
const router = express.Router();
const labTestQueueController = require('../controllers/labTestQueueController');

router.post('/', labTestQueueController.create);      // Add new test
router.get('/', labTestQueueController.getAll);       // Get all tests
router.get('/:id', labTestQueueController.getById);   // Get one test
router.put('/:id', labTestQueueController.update);    // Update test
router.delete('/:id', labTestQueueController.delete); // Delete test

module.exports = router;