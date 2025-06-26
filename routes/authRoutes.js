import express from "express";
import { register, login, getProfile } from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
