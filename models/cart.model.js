const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user.model"
    },
    ordered: {
      type: Boolean,
      default: true
    },
    products: [
      {
      image: String,
      name: String,
      category: String,
      price: Number,
      quantity: Number
    }
    ],
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Cart', cartSchema);
