const express = require('express');
const Order = require('../models/Order'); // Import the Order model
const router = express.Router();

// Create a new order
router.post('/create', async (req, res) => {
  const { buyerID, productID, cardNumber, expiryDate, cvc } = req.body;

  try {
    // Create a new order object
    const newOrder = new Order({
      buyerID,
      productID,
      cardNumber, // In a real-world app, this should not be stored like this
      expiryDate,
      cvc, // This should not be stored like this in a real-world app
    });

    // Save the order to the database
    await newOrder.save();

    // Send success response
    res.status(201).json({ message: 'Order created successfully!' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create the order.' });
  }
});

module.exports = router;
