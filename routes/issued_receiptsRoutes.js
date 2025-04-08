const express = require('express');
const {
    getReceipts,
    addReceipt
} = require('../controllers/issued_receiptsController');
const router = express.Router();

router.get('/', getReceipts);
router.post('/', addReceipt);

module.exports = router;