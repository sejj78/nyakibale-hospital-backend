const express = require('express');
const router = express.Router();
const labSampleTrackingController = require('../controllers/labSampleTrackingController');

router.post('/', labSampleTrackingController.create);
router.get('/', labSampleTrackingController.getAll);
router.get('/:sample_id', labSampleTrackingController.getById);
router.put('/:sample_id', labSampleTrackingController.update);
router.delete('/:sample_id', labSampleTrackingController.delete);

module.exports = router;