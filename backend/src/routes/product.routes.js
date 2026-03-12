import express from "express";
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct 
} from "../controllers/product.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);

export default router;