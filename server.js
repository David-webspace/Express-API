const express = require('express');
const cors = require('cors');
const app = express();

// Test MySQL connection
const pool = require('./db');
pool.query('SELECT 1')
  .then(() => console.log('MySQL connection successful!'))
  .catch(err => console.error('MySQL connection failed:', err.message));
const port = 3001;

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
