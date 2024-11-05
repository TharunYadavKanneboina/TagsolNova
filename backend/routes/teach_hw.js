const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: '50.6.194.240',
    user: 'root',
    password: 'Gfive@123a',
    database: 'NOVA'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

// Upload homework endpoint
app.post('/upload-homework', upload.single('homework_file'), (req, res) => {
    const { class_name, section, subject, description } = req.body;
    const fileData = req.file ? req.file.buffer.toString('base64') : null;

    const query = 'INSERT INTO teachers_homework_upload (class_name, section, subject, description, homework_file) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [class_name, section, subject, description, fileData], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error uploading homework.' });
        }
        res.status(200).json({ message: 'Homework uploaded successfully!' });
    });
});

// Fetch homework list endpoint
app.get('/homework-list', (req, res) => {
    const query = 'SELECT id, class_name, section, subject, description, homework_file FROM teachers_homework_upload';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching homework list:', err);
            return res.status(500).json({ message: 'Error fetching homework list.' });
        }
        const formattedResults = results.map(row => ({
            ...row,
            homework_file: row.homework_file ? `data:application/pdf;base64,${row.homework_file}` : null,
        }));
        res.status(200).json(formattedResults);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
