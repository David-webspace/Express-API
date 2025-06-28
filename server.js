const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Test MySQL connection
const pool = require('./db');
pool.query('SELECT 1')
  .then(() => console.log('MySQL connection successful!'))
  .catch(err => console.error('MySQL connection failed:', err.message));

// async function getUsers(id){
//   const [rows] = await pool.query(`
//     select * from users
//     where id = ${id}
//   `)
//   return rows;
// }

// getUsers(1).then((users) => console.log(users));


// Enable CORS for all origins (for development)
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// app.get('/users/:id', async (req, res) => {
//   const id = req.params.id;
//   const user = await getUsers(id);
//   res.json(user);
// })

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
