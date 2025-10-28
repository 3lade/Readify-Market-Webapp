const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderItem', orderItemSchema);