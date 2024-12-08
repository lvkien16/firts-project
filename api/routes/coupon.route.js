import express from 'express';
import { createCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();

router.post("/create-coupon", createCoupon);

export default router;