const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // <-- change to your MySQL user
    password: 'chen52970466', // <-- change to your MySQL password
    database: 'ooschool',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
