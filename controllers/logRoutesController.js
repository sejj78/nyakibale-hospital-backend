const db = require("../config/db");

// Controller to fetch logs
exports.getLogs = (req, res) => {
    const query = "SELECT * FROM system_logs";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching logs:", err);
            return res.status(500).json({ success: false, message: "Error fetching system logs" });
        }
        res.status(200).json(results);
    });
};

// Controller to add a new log
exports.addLog = (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ success: false, message: "Message field is required" });
    }
    const query = "INSERT INTO logs (message) VALUES (?)";
    db.query(query, [message], (err, result) => {
        if (err) {
            console.error("Error adding log:", err);
            return res.status(500).json({ success: false, message: "Error adding system log" });
        }
        res.status(201).json({ success: true, message: "Log added successfully", logId: result.insertId });
    });
};