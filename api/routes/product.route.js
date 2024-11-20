import express from 'express';
import { createProduct, deleteProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-products", getProducts);
router.put("/delete-product/:id", deleteProduct);

export default router;