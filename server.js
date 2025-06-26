import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
// Optional: import other routes like planRoutes, adminRoutes, etc.

dotenv.config();

const app = express();

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 70, 
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Middleware Setup
app.use(helmet()); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  // Database Connection
  await connectDB();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error);
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
