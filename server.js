const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up the MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin123#',
    database: 'request_management'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Define a route to handle form submissions
app.post('/save_request', (req, res) => {
    const { customer, environment, remarks } = req.body;

    // Validate input
    if (!customer || !environment || !remarks) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Insert data into the database
    const query = 'INSERT INTO requests (customer, environment, remarks) VALUES (?, ?, ?)';
    db.query(query, [customer, environment, remarks], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        res.json({ success: true, message: 'Data saved successfully.' });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
