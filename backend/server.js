const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const app = express();

app.use(cors());
app.use(express.json());

// Підключення до БД
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'mydatabase',
});

db.connect(err => {
  if (err) {
    console.error('Помилка підключення до бази даних:', err);
    process.exit(1);
  }
  console.log('Успішне підключення до бази даних');
});

// Таблиця користувачів
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )
`);

// Реєстрація
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'Всі поля обовʼязкові' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Користувач з таким email вже існує' });
          }
          console.error(err);
          return res.status(500).json({ error: 'Помилка сервера' });
        }

        res.status(201).json({ message: 'Реєстрація пройшла успішно' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка хешування пароля' });
  }
});

// Вхід
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: 'Помилка сервера' });

      if (results.length === 0)
        return res.status(401).json({ error: 'Неправильний email або пароль' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ error: 'Неправильний email або пароль' });

      res.status(200).json({ message: 'Вхід успішний', user: { id: user.id, name: user.name } });
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

