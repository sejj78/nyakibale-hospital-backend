const express = require('express');
const router = express.Router();

// Mock data or controller logic for doctors
router.get('/', (req, res) => {
  res.json({ message: 'Doctors data successfully fetched' });
});

module.exports = router;