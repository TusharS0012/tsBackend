import express from "express";
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
