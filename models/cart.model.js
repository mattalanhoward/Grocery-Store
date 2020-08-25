const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    // userId: {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user.model",
    },
    ordered: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    // Array of products
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product.model",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },

  //  products: [
  //   {
  //   name: String,
  //   imageUrl: String,
  //   category: String,
  //   price: Number,
  //   quantity: Number
  // }
  // ],

  {
    timestamps: true,
  }
);

module.exports = model("Cart", cartSchema);
