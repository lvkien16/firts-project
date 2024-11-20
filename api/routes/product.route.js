import express from 'express';
import { createProduct, deleteProduct, editProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-products", getProducts);
router.put("/delete-product/:id", deleteProduct);
router.put("/edit-product/:id", editProduct);

export default router;