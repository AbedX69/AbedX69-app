const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Middleware to check if the user is an admin based on the request headers or body
const adminAuth = (req, res, next) => {
  const isAdmin = req.body.isAdmin || req.headers['x-is-admin'];
  if (isAdmin === 'true' || isAdmin === true) {  // Check the value of isAdmin
    next();
  } else {
    res.status(403).json({ message: 'Admin access only.' });
  }
};

// USERS: Edit and Delete
router.put('/users/:userID', adminAuth, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ userID: req.params.userID }, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user.' });
  }
});

router.delete('/users/:userID', adminAuth, async (req, res) => {
  try {
    await User.findOneAndDelete({ userID: req.params.userID });
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user.' });
  }
});

// PRODUCTS: Edit and Delete
router.put('/products/:productID', adminAuth, async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate({ productID: req.params.productID }, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product.' });
  }
});

router.delete('/products/:productID', adminAuth, async (req, res) => {
  try {
    await Product.findOneAndDelete({ productID: req.params.productID });
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product.' });
  }
});

// ORDERS: Edit and Delete
router.put('/orders/:orderID', adminAuth, async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate({ orderID: req.params.orderID }, req.body, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order.' });
  }
});

router.delete('/orders/:orderID', adminAuth, async (req, res) => {
  try {
    await Order.findOneAndDelete({ orderID: req.params.orderID });
    res.json({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order.' });
  }
});

// Fetch all users, products, and orders
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users.' });
  }
});

router.get('/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products.' });
  }
});

router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders.' });
  }
});

module.exports = router;
