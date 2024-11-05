const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

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

// Endpoint to add student info
router.post('/submit-complete-info', (req, res) => {
    const { username, password, userType, name, gender, phone_no, designation, aadhar_no, father_name, class_name, section, class_teacher, school_name, address } = req.body;

    // Validate all required fields
    if (!name || !gender || !phone_no || !designation || !aadhar_no || !father_name || !class_name || !section || !class_teacher || !school_name || !address) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = `INSERT INTO management_login_creation (username, password, user_type, name, gender, phone_no, designation, aadhar_no, father_name, class_name, section, class_teacher, school_name, address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [username, password, userType, name, gender, phone_no, designation, aadhar_no, father_name, class_name, section, class_teacher, school_name, address], (err, results) => {
        if (err) {
            console.error('Error adding student info:', err); // Log the specific error
            return res.status(500).json({ success: false, message: 'Failed to add student information.', error: err.message });
        }
        res.json({ success: true, message: 'Student information added successfully!' });
    });
});

module.exports = router;
