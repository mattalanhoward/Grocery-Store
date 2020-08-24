const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const productSchema = new Schema(
//   {
//     name: String,
//     imageUrl: String,
//     category: String,
//     price: Number,
//   },
//   {
//     timestamps: true
//   }
// );

const productSchema = new Schema(
  {
    name: {
      type: String,
      requured: true,
    },
    imageUrl: {
      type: String,
      match: /^https?:\/\//,
    },

    category: {
      type: String,
      enum: ["fruits", "vegetables"],
    },
    price: Number,
  },

  {
    timestamps: true,
  }
);

module.exports = model("Products", productSchema);
