const db = require('../config/db');

// Get all payments (unchanged)
exports.getPayments = async (req, res) => {
    const query = 'SELECT * FROM payments_handled_by_cashier';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Updated addPayment function with receipt_number handling
exports.addPayment = async (req, res) => {
    console.log('addPayment called with:', req.body);
    const { patient_id, amount, payment_method, status, receipt_number } = req.body;

    // Validate payment_method
    const validMethods = ['Cash', 'Mobile Money', 'Bank Transfer', 'Credit Card'];
    if (!payment_method || !validMethods.includes(payment_method)) {
        return res.status(400).json({ error: 'Invalid payment method. Must be one of: Cash, Mobile Money, Bank Transfer, Credit Card' });
    }

    // Validate other fields
    if (!patient_id || isNaN(patient_id)) {
        return res.status(400).json({ error: 'Patient ID must be a valid number' });
    }
    if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Amount must be a valid number' });
    }
    if (status && !['Pending', 'Completed'].includes(status)) {
        return res.status(400).json({ error: 'Status must be Pending or Completed' });
    }

    // Auto-generate receipt number if not provided
    const finalReceiptNumber = receipt_number || `PAY-${Date.now()}`;

    // Check if patient_id exists
    const checkQuery = 'SELECT COUNT(*) as count FROM patients WHERE patient_id = ?';
    db.query(checkQuery, [patient_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results[0].count === 0) {
            return res.status(400).json({ error: 'Patient ID does not exist' });
        }

        // Insert with receipt_number
        const insertQuery = 'INSERT INTO payments_handled_by_cashier (patient_id, amount, payment_method, status, receipt_number) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [patient_id, amount, payment_method, status || 'Pending', finalReceiptNumber], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
                message: 'Payment added successfully', 
                id: results.insertId,
                receipt_number: finalReceiptNumber
            });
        });
    });
};

// Update payment (unchanged)
exports.updatePayment = async (req, res) => {
    const { amount, payment_method, status } = req.body;

    const validMethods = ['Cash', 'Mobile Money', 'Bank Transfer', 'Credit Card'];
    if (!payment_method || !validMethods.includes(payment_method)) {
        return res.status(400).json({ error: 'Invalid payment method. Must be one of: Cash, Mobile Money, Bank Transfer, Credit Card' });
    }

    if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Amount must be a valid number' });
    }
    if (status && !['Pending', 'Completed'].includes(status)) {
        return res.status(400).json({ error: 'Status must be Pending or Completed' });
    }

    const query = 'UPDATE payments_handled_by_cashier SET amount = ?, payment_method = ?, status = ? WHERE id = ?';
    db.query(query, [amount, payment_method, status, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Payment not found' });
        res.status(200).json({ message: 'Payment updated successfully' });
    });
};

// Delete payment (unchanged)
exports.deletePayment = async (req, res) => {
    const query = 'DELETE FROM payments_handled_by_cashier WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Payment not found' });
        res.status(200).json({ message: 'Payment deleted successfully' });
    });
};