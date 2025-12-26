const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);
