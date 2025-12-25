const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false
    },

    price: {
      type: Number,
      required: true
    },

    stock: {
      type: Number,
      default: 0
    },

    images: [
      {
        type: String,
        default: null
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
