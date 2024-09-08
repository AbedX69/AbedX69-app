const mongoose = require('mongoose');
const Counter = require('./Counter'); // Counter for generating productID

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  sellerID: { type: Number, required: true }, // Link to userID
  sellerName: { type: String, required: true }, // Seller's name
  productID: { type: Number, unique: true }, // Unique productID generated via counter
});

// Function to generate the next productID
async function getNextProductID() {
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'productID' },  // Use 'productID' as the identifier for the product counter
    { $inc: { seq: 1 } },  // Increment by 1
    { new: true, upsert: true }  // Create the counter if it doesn't exist
  );
  return counter.seq;
}

// Create Product Method
productSchema.statics.createProduct = async function (productData) {
  productData.productID = await getNextProductID(); // Assign productID using counter
  const newProduct = new this(productData);
  return await newProduct.save();
};

module.exports = mongoose.model('Product', productSchema);
