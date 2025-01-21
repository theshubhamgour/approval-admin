const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Admin123#', // Replace with your MySQL password
    database: 'request_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));

    // Query to check user credentials
    const query = 'SELECT * FROM user_authentication WHERE username = ? AND password = ?';
    db.query(query, [username.toLowerCase(), password], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length > 0) {
            return res.json({ message: 'Login successful', redirect: '/index.html' });
        } else {
            return res.status(401).json({ message: 'User    unauthorized' });
        }
    });
  });

// Serve the HTML file for the index route
app.get('/approval.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'approval.html'));
});



function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  })
      .then((response) => response.json())
      .then((data) => {
          if (data.redirect) {
              window.location.href = data.redirect;
          } else {
              showToast(data.message);
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
      toast.classList.remove('show');
  }, 3000);
}

// Redirect to index.html after login
app.get('/login-success', (req, res) => {
    res.sendFile(path.join(__dirname, 'approval.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check user credentials
  const query = 'SELECT * FROM user_authentication WHERE username = ? AND password = ?';
  db.query(query, [username.toLowerCase(), password], (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    if (results.length > 0) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
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

app.get('/get_requests', (req, res) => {
    const query = 'SELECT * FROM requests';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching requests:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }

        console.log('Fetched requests:', results); // Debugging: Check the fetched data
        res.json({ success: true, requests: results });
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('session');
    res.redirect('/index.html');
});

app.post('/signup', (req, res) => {
    const { full_name, username, password } = req.body;
  
    // Validate input
    if (!full_name || !username || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
  
    // Insert data into the database
    const query = 'INSERT INTO user_authentication (full_name, username, password) VALUES (?, ?, ?)';
    db.query(query, [full_name, username.toLowerCase(), password], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ success: false, message: 'Database error.' });
      }
  
      res.json({ success: true, message: 'Signup successful.' });
    });
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
