import express from "express";
import { submitContactForm } from "../controllers/contactController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, submitContactForm);

export default router;
