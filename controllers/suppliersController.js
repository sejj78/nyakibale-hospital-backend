const db = require('../config/db'); // Corrected path to point to db.js inside the config directory

exports.getSuppliers = async (req, res) => {
    const query = 'SELECT * FROM suppliers';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.addSupplier = async (req, res) => {
    const { name, invoice_amount, due_date, status } = req.body;
    const query = 'INSERT INTO suppliers (name, invoice_amount, due_date, status) VALUES (?, ?, ?, ?)';
    db.query(query, [name, invoice_amount, due_date, status], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Supplier record added successfully', supplierId: results.insertId });
    });
};

exports.updateSupplier = async (req, res) => {
    const { name, invoice_amount, due_date, status } = req.body;
    const query = 'UPDATE suppliers SET name = ?, invoice_amount = ?, due_date = ?, status = ? WHERE id = ?';
    db.query(query, [name, invoice_amount, due_date, status, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Supplier not found' });
        res.status(200).json({ message: 'Supplier record updated successfully' });
    });
};

exports.deleteSupplier = async (req, res) => {
    const query = 'DELETE FROM suppliers WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Supplier not found' });
        res.status(200).json({ message: 'Supplier record deleted successfully' });
    });
};