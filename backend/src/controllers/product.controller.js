import Product from "../models/Products.js";
import logger from "../utils/logger.js";

// @desc    Get all products (with pagination)
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      products,
    });
  } catch (error) {
    logger.error(`Error in getAllProducts: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product with all fields
export const createProduct = async (req, res) => {
  try {
    // Destructured all fields including new ones
    const { 
      name, price, category, stock, imageUrl, 
      description, rating, reviews 
    } = req.body;
    
    // Basic validation
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide name, price, and imageUrl" 
      });
    }

    const product = await Product.create({ 
      name, 
      price, 
      category, 
      stock,
      imageUrl,
      description: description || "No description available.",
      rating: rating || 0,
      reviews: reviews || 0
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product
export const updateProduct = async (req, res) => {
  try {
    // findByIdAndUpdate will automatically update all fields passed in req.body
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};