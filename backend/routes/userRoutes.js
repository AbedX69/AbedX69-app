const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.createUser(req.body); // Create user
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'User already exists.' });
  }
});

// Sign in a user
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with matching email and password
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Use `user.isAdmin` from the database instead of checking the userID
    res.status(200).json({
      message: 'Signed in successfully',
      userID: user.userID,
      name: user.name,
      isAdmin: user.isAdmin // Include the isAdmin flag in the response
    });

  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'There was an error processing your request. Please try again later.' });
  }
});

module.exports = router;
