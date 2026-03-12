import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: String,
  stock: Number,
  // ADD THESE FIELDS:
  description: { type: String, default: "No description available." },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);
export default Product;