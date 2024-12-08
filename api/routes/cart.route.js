import express from 'express';
import { addToCart, getCart, minusQuantity, plusQuantity, removeFromCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add-to-cart', verifyToken, addToCart);
router.get('/get-cart/:userid', verifyToken, getCart);
router.put('/plus-quantity', verifyToken, plusQuantity);
router.put("/minus-quantity", verifyToken, minusQuantity);
router.delete("/remove-from-cart", verifyToken, removeFromCart);

export default router;