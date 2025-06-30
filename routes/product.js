const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const [rows] = await pool.query("select * from products");
    res.json({products: rows});
});

module.exports = router;