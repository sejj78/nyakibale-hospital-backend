const db = require("../config/db");

// Controller to fetch audit trail
exports.getAuditTrail = (req, res) => {
    const query = "SELECT * FROM audit_trail";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching audit trail:", err);
            return res.status(500).json({ success: false, message: "Error fetching audit trail data" });
        }
        res.status(200).json(results);
    });
};

// Controller to add a new audit record
exports.addAuditRecord = (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ success: false, message: "Message field is required" });
    }
    const query = "INSERT INTO audit_trail (message) VALUES (?)";
    db.query(query, [message], (err, result) => {
        if (err) {
            console.error("Error adding audit record:", err);
            return res.status(500).json({ success: false, message: "Error adding audit record" });
        }
        res.status(201).json({ success: true, message: "Audit record added successfully", recordId: result.insertId });
    });
};