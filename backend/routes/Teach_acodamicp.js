const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: '50.6.194.240',
    user: 'root',
    password: 'Gfive@123a',
    database: 'NOVA',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Get students by class and section
app.get('/get_students', (req, res) => {
    const { class: className, section } = req.query;
    const query = 'SELECT name FROM management_login_creation WHERE class_name = ? AND section = ?';

    db.query(query, [className, section], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        res.json(results);
    });
});

// Submit marks
app.post('/submit_marks', (req, res) => {
    const marks = req.body;

    const insertPromises = marks.map(({ class_name, section, student_name, marks }) => {
        const subjectMarks = Object.entries(marks); // Convert marks object into array of subjects and marks
        const subjectPromises = subjectMarks.map(([subject, mark]) => {
            const query = 'INSERT INTO academic_performance_of_the_student (class_name, section, subject, student_name, marks) VALUES (?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                db.query(query, [class_name, section, subject, student_name, mark], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
        return Promise.all(subjectPromises); // Wait for all subjects of a student to be inserted
    });

    Promise.all(insertPromises)
        .then(() => res.json({ message: 'Marks submitted successfully' }))
        .catch((err) => res.status(500).json({ error: 'Failed to submit marks', details: err }));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://50.6.194.240:${PORT}`);
});
