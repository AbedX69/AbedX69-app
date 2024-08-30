const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Add a new product
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;