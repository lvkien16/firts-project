import express from 'express';
import { createProduct, deleteProduct, editProduct, getProductById, getProductForUsers, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-products", getProducts);
router.put("/delete-product/:id", deleteProduct);
router.put("/edit-product/:id", editProduct);
router.get("/get-products-for-users", getProductForUsers);
router.get("/get-product-by-id/:id", getProductById);

export default router;