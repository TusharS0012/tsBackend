import express from "express";
import * as admin from "../controllers/admin.controller";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/role.js";

const router = express.Router();

router.get("/users", verifyToken, isAdmin, admin.getAllUsers);
router.post("/plan", verifyToken, isAdmin, admin.createPlan);
router.post("/product", verifyToken, isAdmin, admin.addProduct);

export default router;
