import express from "express";
import testRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/order.route.js";
import couponRoutes from "./routes/coupon.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/coupon", couponRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});
