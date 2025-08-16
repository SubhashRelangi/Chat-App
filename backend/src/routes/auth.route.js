import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 Login Route
router.post("/login", login);

// 📝 Signup Route
router.post("/signup", signup);

// 🏁 Logout Route
router.post('/logout', logout);

router.put('/update-profile',protectRoute, updateProfile);

router.get('/check', protectRoute, checkAuth)

export default router;