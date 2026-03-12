import express from "express"
import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.routes.js"
import orderRoutes from "./routes/order.routes.js"
// import requestLogger from "./middlewares/requestlogger.js";
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewares/isAuthenticated.js"

const app = express();

//middlewares
app.use(helmet());
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://hack-2-sdg-pjmt-farmlink-7l1f.vercel.app"
//   ],
//   credentials: true
// }));
app.use(cors({
    origin:"https://hack-2-sdg-pjmt-farmlink-7l1f.vercel.app",
  credentials: true}
));
app.use(cookieParser());
app.use(express.json())
// app.use(requestLogger);

app.use("/api/auth",authRoutes);
app.use("/api/products",isAuthenticated, productRoutes);
app.use("/api/orders", orderRoutes);

export default app;