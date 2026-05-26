const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'countrydb',
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Countries API is running.' });
});

app.post('/add', (req, res) => {
  const { name, country } = req.body;

  if (!name || !country) {
    return res.status(400).json({ error: 'name and country are required.' });
  }

  db.query(
    'INSERT INTO clients_registered (name, country) VALUES (?, ?)',
    [name, country],
    (err) => {
      if (err) {
        console.error('Query error:', err.message);
        return res.status(500).json({ error: 'Database error.' });
      }
      res.json({ success: true });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
