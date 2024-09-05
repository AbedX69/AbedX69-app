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
// Note the change: `upload.array('images', 5)` should match the field name in your form
router.post('/create', upload.array('images', 5), async (req, res) => {
  try {
    const { productName, description, price, category, sellerID } = req.body;
    const imagePaths = req.files.map(file => file.path); // Paths of uploaded images

    const newProduct = await Product.createProduct({
      productName,
      description,
      price,
      category,
      images: imagePaths,
      sellerID,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product.' });
  }
});

module.exports = router;
