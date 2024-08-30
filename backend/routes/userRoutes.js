const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
