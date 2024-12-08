import express from 'express';
import { cancelOrder, createOrder, getOrder, getOrders, getOrdersForAdmin, updateOrderStatus } from '../controllers/order.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.get("/get-order/:id", verifyToken, getOrder);
router.get("/get-orders/:user", verifyToken, getOrders);
router.put("/cancel-order/:id", verifyToken, cancelOrder);
router.get("/get-orders-for-admin", verifyToken, getOrdersForAdmin);
router.put("/update-status/:id", verifyToken, updateOrderStatus);

export default router;