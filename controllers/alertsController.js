const db = require("../config/db");

// Controller to fetch alerts
exports.getAlerts = (req, res) => {
    const query = "SELECT * FROM alerts";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching alerts:", err);
            return res.status(500).json({ success: false, message: "Error fetching system alerts" });
        }
        res.status(200).json(results);
    });
};

// Controller to add a new alert
exports.addAlert = (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ success: false, message: "Message field is required" });
    }
    const query = "INSERT INTO alerts (message) VALUES (?)";
    db.query(query, [message], (err, result) => {
        if (err) {
            console.error("Error adding alert:", err);
            return res.status(500).json({ success: false, message: "Error adding system alert" });
        }
        res.status(201).json({ success: true, message: "Alert added successfully", alertId: result.insertId });
    });
};