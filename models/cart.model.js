const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose.set("useFindAndModify", false);

const cartSchema = new Schema(
  {
    // userId: {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
          type: Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Invalid value for product quantity"],
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

// methods :
cartSchema.methods.findcustomerById = (id) => {
  return this.customerId;
};

module.exports = model("Cart", cartSchema);
