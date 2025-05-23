// db.js
require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql2'); // Change to mysql2

// Log all environment variables for debugging
console.log('Environment variables:', {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: '****', // Hide password for security
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT
});

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "hospital_management",
  port: process.env.DB_PORT || 3306,
  multipleStatements: true // Allows multiple queries if needed
};

// Log the configuration for debugging
console.log('Database configuration:', {
  host: dbConfig.host,
  user: dbConfig.user,
  password: '****', // Hide password for security
  database: dbConfig.database,
  port: dbConfig.port
});

// Create connection
const db = mysql.createConnection(dbConfig);

// Connection handler with retry logic
function handleDisconnect() {
  db.connect(err => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(handleDisconnect, 5000); // Retry every 5 seconds
      return;
    }
    console.log('Connected to database with threadId:', db.threadId);
  });

  db.on('error', err => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconnect if connection is lost
    } else {
      throw err;
    }
  });
}

// Start the connection
handleDisconnect();

module.exports = db;