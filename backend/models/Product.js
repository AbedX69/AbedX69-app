// backend/models/Product.js
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

productSchema.statics.createProduct = async function (productData) {
  const productCount = await this.countDocuments();
  productData.productID = productCount + 1;
  const newProduct = new this(productData);
  return await newProduct.save();
};

module.exports = mongoose.model('Product', productSchema);
