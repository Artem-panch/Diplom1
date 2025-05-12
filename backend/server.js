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
  db.query("SET NAMES 'utf8mb4'");
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

// Таблиця замовлень
db.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    phone VARCHAR(20),
    city VARCHAR(100),
    post VARCHAR(50),
    items TEXT,
    total_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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

// Замовлення
app.post('/order', (req, res) => {
  const { name, surname, phone, city, post, items, totalPrice } = req.body;

  if (!name || !surname || !phone || !city || !post || !items || !totalPrice) {
    return res.status(400).json({ error: 'Заповніть усі поля' });
  }

   const simplifiedItems = items.map(item => item.title);
  const itemsJson = JSON.stringify(simplifiedItems);

  db.query(
    'INSERT INTO orders (name, surname, phone, city, post, items, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, surname, phone, city, post, itemsJson, totalPrice],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Помилка при збереженні замовлення' });
      }
      res.status(201).json({ message: 'Замовлення успішно збережене' });
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
