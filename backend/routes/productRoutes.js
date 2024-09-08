const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Create product route
router.post('/create', upload.array('images', 5), async (req, res) => {
  try {
    const { productName, description, price, category, sellerID, sellerName } = req.body;

    // Ensure sellerID is a valid number
    const validSellerID = Number(sellerID); 
    if (isNaN(validSellerID)) {
      return res.status(400).json({ message: 'Invalid seller ID' });
    }

    // Ensure sellerName is provided
    if (!sellerName) {
      return res.status(400).json({ message: 'Seller name is required' });
    }

    // Collect image paths
    const imagePaths = req.files.map(file => file.path); 

    // Create a new product with sellerName
    const newProduct = await Product.createProduct({
      productName,
      description,
      price,
      category,
      images: imagePaths,
      sellerID: validSellerID, // Ensure sellerID is stored as a number
      sellerName, // Include sellerName in the product creation
    });

    res.status(201).json(newProduct); // Status 201 means "Created"
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product.' });
  }
});
// Get products by sellerID, category, or all products
router.get('/', async (req, res) => {
  const { sellerID, category } = req.query;

  try {
    let products;

    if (sellerID) {
      // Fetch products by sellerID
      products = await Product.find({ sellerID: Number(sellerID) });
    } else if (category) {
      // Fetch products by category
      products = await Product.find({ category });
    } else {
      // Fetch all products if no filter is applied
      products = await Product.find();
    }

    res.status(200).json(products); // Status 200 means "OK"
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products.' });
  }
});

module.exports = router;
