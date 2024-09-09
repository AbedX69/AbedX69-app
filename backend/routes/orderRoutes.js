// backend/routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order'); // Import the Order model
const router = express.Router();

// Create a new order
router.post('/create', async (req, res) => {
  const { buyerID, productID, cardNumber, expiryDate, cvc } = req.body;

  try {
    // In a real application, you would integrate with a payment processor here

    // Create the new order
    const newOrder = new Order({
      buyerID,
      productID,
      cardNumber, // In a real-world app, you wouldn't store this
      expiryDate,
      cvc, // In a real-world app, you wouldn't store this
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully!' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create the order.' });
  }
});

module.exports = router;
