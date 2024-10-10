import { hash, compare } from 'bcrypt';
import { db } from './db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const createdAt = new Date().toISOString();

  // Verificar se o e-mail já existe
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (user) {
      return res.status(400).json({ error: 'E-mail já existe' });
    }
  });

  try {
    const hashedPassword = await hash(password, 10);
    db.run(
      'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, createdAt],
      function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, email, createdAt });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    try {
      if (await compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
          expiresIn: '1h',
        });
        res.json({ token });
      } else {
        res.status(400).json({ error: 'Senha incorreta' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const createdAt = new Date().toISOString();

  db.run(
    'INSERT INTO posts (title, content, created_at, user_id) VALUES (?, ?, ?, ?)',
    [title, content, createdAt, userId],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        title,
        content,
        createdAt,
        userId,
      });
    }
  );
};

const listUserPosts = (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM posts WHERE user_id = ?', [id], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
};

const listAllPosts = (req, res) => {
  const query = `
    SELECT posts.id, posts.title, posts.content, posts.created_at, users.name as author
    FROM posts
    JOIN users ON posts.user_id = users.id
  `;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
};
export { registerUser, loginUser, createPost, listUserPosts, listAllPosts };
