const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      default: null
    },

    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],

    total: {
      type: Number,
      required: true
    },

    paid: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ['paid', 'partial', 'unpaid'],
      default: 'unpaid'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
