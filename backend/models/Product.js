const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  name: { type: String, required: true },
  description: { type: String },
  pictures: [{ type: String }], // Array of image URLs
  tags: [{ type: String }] // Array of tags to indicate categories
});

module.exports = mongoose.model('Product', productSchema);
