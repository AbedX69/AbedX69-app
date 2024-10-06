const mongoose = require('mongoose');

// Define the schema for the Counter
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Name of the counter (e.g., 'orderID', 'productID')
  seq: { type: Number, default: 1001 }    // Starting value for the sequence
});

module.exports = mongoose.model('Counter', counterSchema);
