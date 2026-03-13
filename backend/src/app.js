import express from "express";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import cartRoutes from "./routes/cart.route.js";

const app = express();

// --- DYNAMIC CORS CONFIGURATION ---
const allowedOrigins = [
  "https://hack-2-sdg-pjmt-farmlink-7l1f.vercel.app", // Your Production URL
  "http://localhost:5173"                             // Your Local Dev URL
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Crucial: Allows the browser to send cookies/auth headers
}));

// --- MIDDLEWARES ---
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/products", isAuthenticated, productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

export default app;