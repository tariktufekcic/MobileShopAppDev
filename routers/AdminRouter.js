const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateAdmin = require('../Middlewares/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newAdmin = new User({
      username,
      email,
      password,
      admin: true
    });
    await newAdmin.save();
    res.status(201).send('Admin created');
  } catch (err) {
    res.status(500).send('Error creating admin');
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.admin || user.password !== password) { 
      return res.status(401).send('Invalid credentials or not an admin');
    }
    const token = jwt.sign({ id: user._id, role: 'admin' }, 'JWT_SECRET', { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});


router.post('/task', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  
  res.send('Task completed');
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'JWT_SECRET', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
