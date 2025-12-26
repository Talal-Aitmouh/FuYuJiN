const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },

    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    remaining: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Credit', creditSchema);
