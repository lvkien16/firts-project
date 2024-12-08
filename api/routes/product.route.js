import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductByCategory,
  getProductById,
  getProductFeatured,
  getProductForUsers,
  getProducts,
  searchProduct,
  searchProductForUsers,
} from "../controllers/product.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-product", verifyToken, createProduct);
router.get("/get-products", getProducts);
router.put("/delete-product/:id", verifyToken, deleteProduct);
router.put("/edit-product/:id", verifyToken, editProduct);
router.get("/get-products-for-users", getProductForUsers);
router.get("/get-product-by-id/:id", getProductById);
router.get("/search-product/:search", searchProduct);
router.get("/get-products-featured", getProductFeatured);
router.get("/search-product-for-users/:search", searchProductForUsers);
router.get("/get-products-by-category/:id", getProductByCategory);

export default router;
