const db = require("../config/db");

// Controller to fetch tickets
exports.getTickets = (req, res) => {
    const query = "SELECT * FROM tickets";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching tickets:", err);
            return res.status(500).json({ success: false, message: "Error fetching system tickets" });
        }
        res.status(200).json(results);
    });
};

// Controller to add a new ticket
exports.addTicket = (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ success: false, message: "Message field is required" });
    }
    const query = "INSERT INTO tickets (message) VALUES (?)";
    db.query(query, [message], (err, result) => {
        if (err) {
            console.error("Error adding ticket:", err);
            return res.status(500).json({ success: false, message: "Error adding system ticket" });
        }
        res.status(201).json({ success: true, message: "Ticket added successfully", ticketId: result.insertId });
    });
};