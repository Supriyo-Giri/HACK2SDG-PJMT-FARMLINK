// const mongoose = require('mongoose');
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // Add this field
  category: String,
  stock: Number
});

// module.exports = mongoose.model('Product', productSchema);
const Product = mongoose.model('Product', productSchema);
export default Product