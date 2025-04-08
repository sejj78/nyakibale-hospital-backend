const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: '',  // Replace with your actual MySQL username
    password: '',  // Replace with your actual MySQL password
    database: 'hospital_management'  // Ensure this matches your database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting:', err);
        return;
    }
    console.log('Connected to the database.');
});

connection.query('SELECT * FROM notifications', (err, results) => {
    if (err) {
        console.error('Error fetching notifications:', err);
    } else {
        console.log('Notifications:', results);
    }
});

connection.end();
