const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Counter = require('../models/Counter'); // Make sure to import the Counter model

// Function to generate the next orderID
const getNextOrderID = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'orderID' },  // Use 'orderID' as the identifier for the order counter
    { $inc: { seq: 1 } },  // Increment by 1
    { new: true, upsert: true }  // Create the counter if it doesn't exist
  );
  return counter.seq; // Return the incremented sequence number
};

// Create a new order
router.post('/create', async (req, res) => {
  const { buyerID, productID, cardNumber, expiryDate, cvc } = req.body;

  try {
    // Generate the next orderID
    const orderID = await getNextOrderID();

    // Create a new order object with the generated orderID
    const newOrder = new Order({
      orderID,  // Set the generated orderID here
      buyerID,
      productID,
      cardNumber,
      expiryDate,
      cvc,
    });

    // Save the order to the database
    await newOrder.save();

    // Send success response with the generated orderID
    res.status(201).json({ message: 'Order created successfully!', orderID: newOrder.orderID });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Failed to create the order.' });
  }
});

// Route to get products ordered by a specific buyer
router.get('/ordered-products/:buyerID', async (req, res) => {
  const { buyerID } = req.params;

  try {
    // Find unique product IDs for the buyer
    const orderedProductIDs = await Order.distinct('productID', { buyerID: parseInt(buyerID) });

    // Find the product details based on these IDs
    const products = await Product.find({ productID: { $in: orderedProductIDs } });

    res.status(200).json(products); // Send the products as a response
  } catch (error) {
    console.error('Failed to fetch ordered products:', error);
    res.status(500).json({ message: 'Failed to fetch ordered products.' });
  }
});

module.exports = router;
