// backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'User already exists.' });
  }
});

// Sign in a user
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Signed in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'There was an error processing your request. Please try again later.' });
  }
});

module.exports = router;
