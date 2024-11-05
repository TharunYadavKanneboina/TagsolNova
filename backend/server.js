const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Temporary storage for partially completed account data
let tempAccountData = {};

// MySQL Database Configuration
const dbConfig = {
    host: 'localhost',
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

// Endpoint to temporarily store account data
app.post('/create-account', (req, res) => {
    const { username, password, userType } = req.body;
    const date = new Date().toISOString().slice(0, 10);

    if (!username || !password || !userType) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Store account data temporarily
    tempAccountData = { username, password, userType, date };
    res.json({ success: true, message: 'Account data stored. Proceed to complete the student info.' });
});

// Endpoint to store combined data in a single row after both forms are completed
app.post('/submit-complete-info', (req, res) => {
    const {
        name, gender, phone_no, designation, aadhar_no, father_name,
        class_name, section, class_teacher, school_name, address
    } = req.body;

    // Check that account data and student information are both available
    if (!tempAccountData.username || !name || !gender || !phone_no || !designation || !aadhar_no ||
        !father_name || !class_name || !section || !class_teacher || !school_name || !address) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Consolidate account and student information into a single object
    const completeData = {
        ...tempAccountData,
        name, gender, phone_no, designation, aadhar_no,
        father_name, class_name, section, class_teacher, school_name, address
    };

    const sql = `INSERT INTO management_login_creation (username, password, user_type, date, name, gender, phone_no, designation, aadhar_no, father_name, class_name, section, class_teacher, school_name, address) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, Object.values(completeData), (err, results) => {
        if (err) {
            console.error('Error storing information:', err);
            return res.status(500).json({ success: false, message: 'Failed to store information.', error: err.message });
        }
        // Clear the temporary data after successful submission
        tempAccountData = {};
        res.json({ success: true, message: 'Account and student information stored successfully!' });
    });
});

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://192.168.0.114:${PORT}`);
});
