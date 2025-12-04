import { Router } from "express";
import { generateSmartMealPlan } from "../controllers/ai.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Protect all AI routes with authentication
router.use(authenticate);

// POST /api/v1/ai/generate
router.post("/generate", generateSmartMealPlan);

export default router;