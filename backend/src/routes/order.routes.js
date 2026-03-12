import express from "express";
import { createOrder, getMyOrders } from "../controllers/order.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// All order routes require the user to be authenticated
router.post("/", isAuthenticated, createOrder);
router.get("/my-orders", isAuthenticated, getMyOrders);

export default router;