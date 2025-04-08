const express = require("express");
const { getTickets, addTicket } = require("../controllers/ticketsController");
const router = express.Router();

// Route to fetch tickets
router.get("/", getTickets);

// Route to add a new ticket
router.post("/", addTicket);

module.exports = router;