const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '192.168.0.118',
    user: 'root',
    password: '',
    database: 'nova'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

app.post('/add-event', (req, res) => {
    const { title, date } = req.body;
    const query = 'INSERT INTO management_cal (event_name, event_date) VALUES (?, ?)';
    connection.query(query, [title, date], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Event added successfully', eventId: result.insertId });
        }
    });
});

app.get('/events', (req, res) => {
    const { year, month } = req.query;
    const query = `
      SELECT event_name AS title, event_date AS date 
      FROM management_cal 
      WHERE YEAR(event_date) = ? AND MONTH(event_date) = ?
    `;
    connection.query(query, [year, month], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});