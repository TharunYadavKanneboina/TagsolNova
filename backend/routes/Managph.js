const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],

    allowedHeaders: ['Content-Type'],
}));

// MySQL Database Configuration
const dbConfig = {
    host: '50.6.194.240',
    user: 'root',
    password: 'Gfive@123a',
    database: 'NOVA',
};

// Create MySQL connection
const db = mysql.createConnection(dbConfig);

// Connect to the MySQL database
db.connect((error) => {
    if (error) {
        console.error('Error connecting to database:', error);
        return;
    }
    console.log('Connected to the database');
});

// Ensure the uploads directory exists
const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Set up multer for file upload handling with disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Change to your desired upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Save the file with a unique name
    }
});

const upload = multer({ storage });

// Endpoint to upload event media details
app.post('/api/upload-event-media', upload.single('attached_file'), (req, res) => {
    const { name_of_event, uploader_name, uploader_designation } = req.body;

    // Validate required fields
    if (!name_of_event || !uploader_name || !uploader_designation || !req.file) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // File path from multer
    const photoPath = req.file.path; // Path where the file is saved

    // Insert the media upload data into the MySQL database
    const insertQuery = `
        INSERT INTO management_photo_upload (photo_data, name_of_event, attached_file, uploader_name, uploader_designation)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [photoPath, name_of_event, req.file.originalname, uploader_name, uploader_designation], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            return res.status(500).json({ success: false, message: 'Database insertion failed.' });
        }

        res.status(200).json({ success: true, message: 'Files uploaded successfully!' });
    });
});

// Error handling middleware for debugging
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
