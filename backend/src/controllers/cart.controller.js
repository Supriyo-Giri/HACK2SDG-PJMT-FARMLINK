import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import logger from "../utils/logger.js";

// @desc    Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    logger.error(`Error in getCart: ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc    Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({ userId, items: [{ productId, quantity }] });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    logger.error(`Error in addToCart: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove item from cart
export const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    logger.error(`Error in removeItem: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};