const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // The name of the sequence (e.g., 'userID')
  seq: { type: Number, default: 1001 }     // Start the sequence from 1001
});

module.exports = mongoose.model('Counter', counterSchema);
