import Order from "../models/Order.js";
import Product from "../models/Products.js";
import logger from "../utils/logger.js";

// @desc    Create a new order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // Expecting: [{ productId, quantity }]
    const userId = req.user._id;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Verify products, check stock, and calculate total
    for (let item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.productId} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * item.quantity;
      
      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price // Snapshot the price
      });

      // Optional: Deduct stock here or during payment confirmation
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      status: 'pending'
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    logger.error(`Error in createOrder: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc    Get order history for a user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};