const mongoose = require('mongoose');

// Define the schema for an Order
const orderSchema = new mongoose.Schema({
  buyerID: { type: Number, required: true }, // ID of the buyer
  productID: { type: Number, required: true }, // ID of the product
  cardNumber: { type: String, required: true }, // Credit card number (normally not stored like this)
  expiryDate: { type: String, required: true }, // Expiry date of the card
  cvc: { type: String, required: true }, // CVC of the card
  orderDate: { type: Date, default: Date.now }, // Order date (auto-generated)
});

// Export the model
module.exports = mongoose.model('Order', orderSchema);
