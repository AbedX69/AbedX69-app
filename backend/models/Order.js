const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderID: { type: String, required: true, unique: true },
  sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Seller (User)
  buyerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Buyer (User)
  productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
  paymentInfo: {
    address: { type: String, required: true },
    creditCardInfo: { 
      cardNumber: { type: String, required: true },
      expirationDate: { type: String, required: true },
      cvv: { type: String, required: true }
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);
