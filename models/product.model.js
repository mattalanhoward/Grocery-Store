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
      required: true,
    },
    imageUrl: {
      type: String,
      // match: /^https?:\/\//,
    },

    category: {
      type: String,
      enum: ["fruits", "vegetables", "breads", "meat"],
    },
    price: Number,
  },

  {
    timestamps: true,
  }
);

module.exports = model("Products", productSchema);
