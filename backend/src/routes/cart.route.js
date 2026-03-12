import express from "express";
import { getCart, addToCart, removeItem, updateQuantity } from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.delete("/remove/:productId", isAuthenticated, removeItem);
router.put("/update", isAuthenticated, updateQuantity);

export default router;