import express from "express"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.routes.js"
import orderRoutes from "./routes/order.routes.js"
// import requestLogger from "./middlewares/requestlogger.js";
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// app.use(cors());
app.use(cookieParser());
app.use(express.json())
// app.use(requestLogger);

app.use("/api/auth",authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;