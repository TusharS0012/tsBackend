import express from "express";
import { register, login, getProfile } from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", verifyToken, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});
router.get("/profile", verifyToken, getProfile);

export default router;
