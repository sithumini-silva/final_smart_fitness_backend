import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
    generateWorkoutPlan,
    saveWorkoutPlan,
    getWorkoutPlans,
    deleteWorkoutPlan
} from "../controllers/workoutPlan.controller";

const router = Router();

router.use(authenticate);

router.post("/generate", generateWorkoutPlan);
router.post("/", saveWorkoutPlan);
router.get("/", getWorkoutPlans);
router.delete("/:id", deleteWorkoutPlan);

export default router;
