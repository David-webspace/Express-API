const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();
const JWT_SECRET = 'chen52168733'; // <-- change to a secure secret

// Register
router.post('/register', async (req, res) => {
    console.log('Register body:', req.body);
    const { first_name, last_name, email, passwords, phone_number } = req.body;
    if (!first_name || !last_name || !email || !passwords || !phone_number) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Email already registered.' });
        }
        const hashedPassword = await bcrypt.hash(passwords, 10);
        await pool.query(
            'INSERT INTO users (first_name, last_name, email, passwords, phone_number) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword, phone_number]
        );
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Registration error:', err); // <-- Add this line!
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const user = users[0];
        const match = await bcrypt.compare(password, user.passwords);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.first_name + ' ' + user.last_name },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.json({ message: "Login Successful", token, user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, phone_number: user.phone_number } });
    
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.post('/users', async (req, res) => {
    const { customer_id, product_id} = req.body;
    console.log(req.body);
    if(!customer_id || !product_id){
        return res.status(400).json({message: 'All fields are required.'});
    }
    try{
        await pool.query(
          'INSERT INTO cart (customer_id, product_id, quantity) VALUES (?, ?, ?)',
          [customer_id, product_id, quantity]
        )
        res.status(201).json({message: "Book added to cart successfully."})
    }
    catch(err){
        res.status(500).json({message: "Server error", error: err.message})
    }
})

module.exports = router;
