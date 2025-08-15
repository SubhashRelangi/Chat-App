import express from "express";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

// 🔐 Login Route
router.post("/login", login);

// 📝 Signup Route
router.post("/signup", signup);

export default router;