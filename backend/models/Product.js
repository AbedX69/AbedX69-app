const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  sellerID: { type: Number, required: true },
  productID: { type: Number, unique: true },
});

// Method to auto-generate a product ID
productSchema.statics.createProduct = async function (productData) {
  const productCount = await this.countDocuments(); // Count current products
  productData.productID = productCount + 1; // Auto-generate product ID
  const newProduct = new this(productData);
  return await newProduct.save();
};

module.exports = mongoose.model('Product', productSchema);
