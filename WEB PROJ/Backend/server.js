/* // const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

// const app = express();

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());

// // MySQL pool connection
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Test database connection
// pool.getConnection()
//   .then(() => console.log('✅ MySQL Connected...'))
//   .catch(err => console.error('❌ MySQL Connection Error:', err));

// // Check email availability
// app.get('/users/check-email', async (req, res) => {
//   const { email } = req.query;
//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     res.json({ exists: userRows.length > 0 });
//   } catch (err) {
//     console.error('Check Email Error:', err);
//     res.status(500).json({ message: 'Server error while checking email' });
//   }
// });

// // Signup route
// app.post('/users/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'Name, email, and password are required' });
//   }

//   try {
//     const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (user.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({
//       message: 'User registered successfully',
//       user: { id: result.insertId, name, email }
//     });
//   } catch (err) {
//     console.error('Signup Error:', err);
//     res.status(500).json({ message: 'Server error during signup' });
//   }
// });

// // Login route
// app.post('/users/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     const user = userRows[0];
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({
//       message: 'Login successful',
//       user: { id: user.id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// });

// // Fetch notes
// app.get('/notes', async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }

//   try {
//     const [rows] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching notes:', err);
//     res.status(500).json({ message: 'Error fetching notes' });
//   }
// });

// // Fetch categories
// app.get('/categories', async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }

//   try {
//     const [rows] = await pool.query('SELECT * FROM categories WHERE user_id = ?', [userId]);
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     res.status(500).json({ message: 'Error fetching categories' });
//   }
// });

// const PORT = process.env.PORT || 4003;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

// const app = express();

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());

// // MySQL pool connection
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Test database connection
// pool.getConnection()
//   .then(() => console.log('✅ MySQL Connected...'))
//   .catch(err => console.error('❌ MySQL Connection Error:', err));

// // Ensure all error responses are JSON
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong on the server' });
// });

// // Check email availability
// app.get('/users/check-email', async (req, res) => {
//   const { email } = req.query;
//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     res.json({ exists: userRows.length > 0 });
//   } catch (err) {
//     console.error('Check Email Error:', err);
//     res.status(500).json({ message: 'Server error while checking email' });
//   }
// });

// // Signup route
// app.post('/users/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'Name, email, and password are required' });
//   }

//   try {
//     const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (user.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({
//       message: 'User registered successfully',
//       user: { id: result.insertId.toString(), name, email }
//     });
//   } catch (err) {
//     console.error('Signup Error:', err);
//     res.status(500).json({ message: 'Server error during signup' });
//   }
// });

// // Login route
// app.post('/users/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     const user = userRows[0];
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({
//       message: 'Login successful',
//       user: { id: user.id.toString(), name: user.name, email: user.email }
//     });
//   } catch (err) {
//     console.error('Login Error:', err);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// });

// // Fetch notes
// app.get('/notes', async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }

//   try {
//     const [rows] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
//     res.json(rows.map(row => ({
//       id: row.id.toString(),
//       title: row.title,
//       content: row.content,
//       category_id: row.category_id ? row.category_id.toString() : null,
//       user_id: row.user_id.toString(),
//       created_at: row.created_at,
//       updated_at: row.updated_at
//     })));
//   } catch (err) {
//     console.error('Error fetching notes:', err);
//     res.status(500).json({ message: 'Error fetching notes' });
//   }
// });

// // Create a note
// app.post('/notes', async (req, res) => {
//   const { title, content, category_id, userId } = req.body;
//   if (!title || !userId) {
//     return res.status(400).json({ message: 'Title and userId are required' });
//   }

//   try {
//     const [result] = await pool.query(
//       'INSERT INTO notes (title, content, category_id, user_id) VALUES (?, ?, ?, ?)',
//       [title, content || '', category_id || null, userId]
//     );
//     res.status(201).json({
//       id: result.insertId.toString(),
//       title,
//       content: content || '',
//       category_id: category_id || null,
//       user_id: userId,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString()
//     });
//   } catch (err) {
//     console.error('Error creating note:', err);
//     res.status(500).json({ message: 'Error creating note' });
//   }
// });

// // Update a note
// app.put('/notes/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, content, category_id, userId } = req.body;
//   if (!title || !userId) {
//     return res.status(400).json({ message: 'Title and userId are required' });
//   }

//   try {
//     const [notes] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, userId]);
//     if (notes.length === 0) {
//       return res.status(404).json({ message: 'Note not found or you do not have permission' });
//     }

//     await pool.query(
//       'UPDATE notes SET title = ?, content = ?, category_id = ?, updated_at = ? WHERE id = ?',
//       [title, content || '', category_id || null, new Date().toISOString(), id]
//     );

//     res.json({
//       id,
//       title,
//       content: content || '',
//       category_id: category_id || null,
//       user_id: userId,
//       created_at: notes[0].created_at,
//       updated_at: new Date().toISOString()
//     });
//   } catch (err) {
//     console.error('Error updating note:', err);
//     res.status(500).json({ message: 'Error updating note' });
//   }
// });

// // Delete a note
// app.delete('/notes/:id', async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;
//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }

//   try {
//     const [notes] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, userId]);
//     if (notes.length === 0) {
//       return res.status(404).json({ message: 'Note not found or you do not have permission' });
//     }

//     await pool.query('DELETE FROM notes WHERE id = ?', [id]);
//     res.json({ message: 'Note deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting note:', err);
//     res.status(500).json({ message: 'Error deleting note' });
//   }
// });

// // Fetch categories
// app.get('/categories', async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) {
//     return res.status(400).json({ message: 'userId is required' });
//   }

//   try {
//     const [rows] = await pool.query('SELECT * FROM categories WHERE user_id = ?', [userId]);
//     res.json(rows.map(row => ({
//       id: row.id.toString(),
//       name: row.name,
//       user_id: row.user_id.toString()
//     })));
//   } catch (err) {
//     console.error('Error fetching categories:', err);
//     res.status(500).json({ message: 'Error fetching categories' });
//   }
// });

// // Create a category
// app.post('/categories', async (req, res) => {
//   const { name, userId } = req.body;
//   if (!name || !userId) {
//     return res.status(400).json({ message: 'Name and userId are required' });
//   }

//   try {
//     const [result] = await pool.query(
//       'INSERT INTO categories (name, user_id) VALUES (?, ?)',
//       [name, userId]
//     );
//     res.status(201).json({
//       id: result.insertId.toString(),
//       name,
//       user_id: userId
//     });
//   } catch (err) {
//     console.error('Error creating category:', err);
//     res.status(500).json({ message: 'Error creating category' });
//   }
// });

// const PORT = process.env.PORT || 4003;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MySQL pool connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(() => console.log('✅ MySQL Connected...'))
  .catch(err => console.error('❌ MySQL Connection Error:', err));

// Ensure all error responses are JSON
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

// Check email availability
app.get('/users/check-email', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    res.json({ exists: userRows.length > 0 });
  } catch (err) {
    console.error('Check Email Error:', err);
    res.status(500).json({ message: 'Server error while checking email' });
  }
});

// Signup route
app.post('/users/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: result.insertId.toString(), name, email, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login route
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = userRows[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id.toString(), name: user.name, email: user.email, created_at: user.created_at, updated_at: user.updated_at }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Fetch notes
app.get('/notes', async (req, res) => {
  console.log('Received GET /notes with query:', req.query); // Debug log
  const { userId, user_id } = req.query;
  const userIdValue = userId || user_id;
  if (!userIdValue) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [userIdValue]);
    res.json(rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      content: row.content,
      category_id: row.category_id.toString(),
      user_id: row.user_id.toString(),
      created_at: row.created_at,
      updated_at: row.updated_at
    })));
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Create a note
app.post('/notes', async (req, res) => {
  const { title, content, category_id, userId } = req.body;
  if (!title || !content || !category_id || !userId) {
    return res.status(400).json({ message: 'Title, content, category_id, and userId are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO notes (title, content, category_id, user_id) VALUES (?, ?, ?, ?)',
      [title, content, category_id, userId]
    );
    res.status(201).json({
      id: result.insertId.toString(),
      title,
      content,
      category_id: category_id.toString(),
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Error creating note' });
  }
});

// Update a note
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, category_id, userId } = req.body;
  if (!title || !content || !category_id || !userId) {
    return res.status(400).json({ message: 'Title, content, category_id, and userId are required' });
  }

  try {
    const [notes] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, userId]);
    if (notes.length === 0) {
      return res.status(404).json({ message: 'Note not found or you do not have permission' });
    }

    await pool.query(
      'UPDATE notes SET TTL = ?, content = ?, category_id = ?, updated_at = ? WHERE id = ?',
      [title, content, category_id, new Date().toISOString(), id]
    );

    res.json({
      id,
      title,
      content,
      category_id: category_id.toString(),
      user_id: userId,
      created_at: notes[0].created_at,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ message: 'Error updating note' });
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const [notes] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, userId]);
    if (notes.length === 0) {
      return res.status(404).json({ message: 'Note not found or you do not have permission' });
    }

    await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Error deleting note' });
  }
});

// Fetch categories
app.get('/categories', async (req, res) => {
  console.log('Received GET /categories with query:', req.query); // Debug log
  const { userId, user_id } = req.query;
  const userIdValue = userId || user_id;
  if (!userIdValue) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE user_id = ?', [userIdValue]);
    res.json(rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      user_id: row.user_id.toString(),
      created_at: row.created_at
    })));
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Create a category
app.post('/categories', async (req, res) => {
  const { name, userId } = req.body;
  if (!name || !userId) {
    return res.status(400).json({ message: 'Name and userId are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO categories (name, user_id) VALUES (?, ?)',
      [name, userId]
    );
    res.status(201).json({
      id: result.insertId.toString(),
      name,
      user_id: userId,
      created_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ message: 'Error creating category' });
  }
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); */

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MySQL pool connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(() => console.log('✅ MySQL Connected...'))
  .catch(err => console.error('❌ MySQL Connection Error:', err));

// Ensure all error responses are JSON
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

// Check email availability
app.get('/users/check-email', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    res.json({ exists: userRows.length > 0 });
  } catch (err) {
    console.error('Check Email Error:', err);
    res.status(500).json({ message: 'Server error while checking email' });
  }
});

// Signup route
app.post('/users/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: result.insertId.toString(), name, email, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login route
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = userRows[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id.toString(), name: user.name, email: user.email, created_at: user.created_at, updated_at: user.updated_at }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Fetch notes
app.get('/notes', async (req, res) => {
  console.log('Received GET /notes with query:', req.query); // Debug log
  const { userId, user_id } = req.query;
  const userIdValue = userId || user_id;
  if (!userIdValue) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [userIdValue]);
    res.json(rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      content: row.content,
      category_id: row.category_id.toString(),
      user_id: row.user_id.toString(),
      created_at: row.created_at,
      updated_at: row.updated_at
    })));
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Create a note
app.post('/notes', async (req, res) => {
  const { title, content, category_id, userId, user_id } = req.body;
  const userIdValue = userId || user_id;
  if (!title || !content || !category_id || !userIdValue) {
    return res.status(400).json({ message: 'Title, content, category_id, and userId are required' });
  }

  try {
    // Validate category_id exists for the user
    const [categories] = await pool.query('SELECT * FROM categories WHERE id = ? AND user_id = ?', [category_id, userIdValue]);
    if (categories.length === 0) {
      return res.status(400).json({ message: 'Invalid category_id or category does not belong to user' });
    }

    const [result] = await pool.query(
      'INSERT INTO notes (title, content, category_id, user_id) VALUES (?, ?, ?, ?)',
      [title, content, category_id, userIdValue]
    );
    res.status(201).json({
      id: result.insertId.toString(),
      title,
      content,
      category_id: category_id.toString(),
      user_id: userIdValue,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Error creating note' });
  }
});

// Update a note
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, category_id, userId, user_id } = req.body;
  const userIdValue = userId || user_id;
  if (!title || !content || !category_id || !userIdValue) {
    return res.status(400).json({ message: 'Title, content, category_id, and userId are required' });
  }

  try {
    // Validate category_id exists for the user
    const [categories] = await pool.query('SELECT * FROM categories WHERE id = ? AND user_id = ?', [category_id, userIdValue]);
    if (categories.length === 0) {
      return res.status(400).json({ message: 'Invalid category_id or category does not belong to user' });
    }

    const [notes] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, userIdValue]);
    if (notes.length === 0) {
      return res.status(404).json({ message: 'Note not found or you do not have permission' });
    }

    await pool.query(
      'UPDATE notes SET title = ?, content = ?, category_id = ?, updated_at = ? WHERE id = ?',
      [title, content, category_id, new Date().toISOString(), id]
    );

    res.json({
      id,
      title,
      content,
      category_id: category_id.toString(),
      user_id: userIdValue,
      created_at: notes[0].created_at,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ message: 'Error updating note' });
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, user_id } = req.body;
  const userIdValue = userId || user_id;
  if (!userIdValue) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    const [notes] = await pool.query('SELECT * FROM notes WHERE id = ? AND user_id = ?', [id, userIdValue]);
    if (notes.length === 0) {
      return res.status(404).json({ message: 'Note not found or you do not have permission' });
    }

    await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Error deleting note' });
  }
});

// Fetch categories
app.get('/categories', async (req, res) => {
  console.log('Received GET /categories with query:', req.query); // Debug log
  const { userId, user_id } = req.query;
  const userIdValue = userId || user_id;
  if (!userIdValue) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE user_id = ?', [userIdValue]);
    res.json(rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      user_id: row.user_id.toString(),
      created_at: row.created_at
    })));
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Create a category
app.post('/categories', async (req, res) => {
  const { name, userId, user_id } = req.body;
  const userIdValue = userId || user_id;
  if (!name || !userIdValue) {
    return res.status(400).json({ message: 'Name and userId are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO categories (name, user_id) VALUES (?, ?)',
      [name, userIdValue]
    );
    res.status(201).json({
      id: result.insertId.toString(),
      name,
      user_id: userIdValue,
      created_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ message: 'Error creating category' });
  }
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});