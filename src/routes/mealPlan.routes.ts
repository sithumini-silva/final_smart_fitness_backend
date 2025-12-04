import { Router } from "express";
import {
    createMealPlan,
    getMealPlans,
    deleteMealPlan,
    getMealPlanById,
    updateMealPlan
} from "../controllers/mealPlan.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

// Protect all routes with authentication middleware
router.use(authenticate);

router.post("/", createMealPlan);       // Create a new meal plan
router.get("/", getMealPlans);          // Get all meal plans for the user
router.get("/:id", getMealPlanById);    // Get a specific meal plan by ID
router.put("/:id", updateMealPlan);     // Update a specific meal plan
router.delete("/:id", deleteMealPlan);  // Delete a specific meal plan

export default router;