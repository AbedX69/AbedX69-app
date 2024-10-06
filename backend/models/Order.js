const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import the Counter model

// Define the schema for an Order
const orderSchema = new mongoose.Schema({
  orderID: { type: Number, required: true, unique: true }, // Change to Number type
  buyerID: { type: Number, required: true }, // ID of the buyer
  productID: { type: Number, required: true }, // ID of the product
  cardNumber: { type: String, required: true }, // Store as plain text for homework purposes
  expiryDate: { type: String, required: true }, // Store as plain text
  cvc: { type: String, required: true }, // Store as plain text
  orderDate: { type: Date, default: Date.now }, // Order date (auto-generated)
});

// Export the model
module.exports = mongoose.model('Order', orderSchema);
