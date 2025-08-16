import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

// 🔐 Login Route
router.post("/login", login);

// 📝 Signup Route
router.post("/signup", signup);

// 🏁 Logout Route
router.post('/logout', logout);


export default router;