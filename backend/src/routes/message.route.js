import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);
router.get("/:users", protectRoute, getUsersForSidebar);

export default router;
