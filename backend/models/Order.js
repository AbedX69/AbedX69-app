// backend/models/Order.js
const mongoose = require('mongoose');

// Define the schema for an Order
const orderSchema = new mongoose.Schema({
  buyerID: { type: Number, required: true }, // Reference to the user who made the purchase
  productID: { type: Number, required: true }, // Reference to the product being ordered
  cardNumber: { type: String, required: true }, // Placeholder; sensitive data should not be stored like this in production
  expiryDate: { type: String, required: true }, // Expiry date of the credit card
  cvc: { type: String, required: true }, // CVC of the credit card
  orderDate: { type: Date, default: Date.now }, // Automatically set the order date
});

// Create a method to validate the order data if needed (e.g., format of card number)

// Compile and export the Order model
module.exports = mongoose.model('Order', orderSchema);
