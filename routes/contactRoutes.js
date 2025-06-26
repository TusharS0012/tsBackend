import express from "express";
const verifyToken = require("../middleware/verifyToken");
const { submitContactForm } = require("../controllers/contactController");

const router = express.Router();

router.post("/", verifyToken ,submitContactForm); 

module.exports = router;
