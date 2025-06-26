import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.post("/verify", verifyToken, verifyPayment);

export default router;
