// controllers/inventoryController.js
const db = require('../config/db');

// Add new medicine to inventory
const addMedicine = async (req, res) => {
  const { medicine_name, stock_quantity, expiry_date, reorder_level, price } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO inventory (medicine_name, stock_quantity, expiry_date, reorder_level, price) VALUES (?, ?, ?, ?, ?)',
      [medicine_name, stock_quantity, expiry_date, reorder_level, price]
    );
    res.status(201).json({ id: result.insertId, medicine_name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all inventory records
const getInventory = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM inventory');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addMedicine, getInventory };
