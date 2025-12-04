import { Router } from "express";
import {
    register,
    login,
    getMyDetails,
    handleRefreshToken,
    registerAdmin // We imported this now, so it's safe to use
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", handleRefreshToken);

// Protected Routes
router.get("/me", authenticate, getMyDetails);

// Admin Route (Optional - ensure you want this accessible)
router.post("/admin/register", registerAdmin);

export default router;