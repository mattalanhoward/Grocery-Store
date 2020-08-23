const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    image: String,
    category: String,
    price: Number,
    quantity: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Products', productSchema);
