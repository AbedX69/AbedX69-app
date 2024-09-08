const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // The name of the counter (e.g., 'userID' or 'productID')
  seq: { type: Number, default: 1001 }    // The starting value for the sequence
});

module.exports = mongoose.model('Counter', counterSchema);
