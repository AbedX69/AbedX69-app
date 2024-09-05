const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// Get products by sellerID, category, or productIDs
router.get('/', async (req, res) => {
  const { sellerID, category, ids } = req.query;

  try {
    let products;

    if (sellerID) {
      // Fetch products where the sellerID matches
      products = await Product.find({ sellerID });

      // Fetch the seller's name and add it to the product response
      const seller = await User.findOne({ userID: sellerID });
      if (seller) {
        products = products.map(product => ({
          ...product.toObject(),
          sellerName: seller.name, // Add seller's name to each product
        }));
      }
    } else if (category) {
      // Fetch products by category
      products = await Product.find({ category });
    } else if (ids) {
      // Fetch products by productIDs
      const productIds = ids.split(',').map(id => Number(id));
      products = await Product.find({ productID: { $in: productIds } });
    } else {
      // Fetch all products by default
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products.' });
  }
});

module.exports = router;
