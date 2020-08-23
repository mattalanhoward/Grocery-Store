const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    category: String,
    price: Number,
  },
  {
    timestamps: true
  }
);

module.exports = model('Products', productSchema);
