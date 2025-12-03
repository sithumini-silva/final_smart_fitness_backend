// // routes/mealPlan.routes.ts
// import { Router } from "express";
// import {
//   createMealPlan,
//   getMealPlans,
//   getMealPlanById,
//   updateMealPlan,
//   deleteMealPlan,
// } from "../controllers/mealPlan.controller";
// import { authenticate } from "../middleware/auth";

// const router = Router();

// // All routes protected by authentication
// router.use(authenticate);

// router.post("/", createMealPlan);       // Create
// router.get("/", getMealPlans);          // Get all for user
// router.get("/:id", getMealPlanById);    // Get single
// router.put("/:id", updateMealPlan);     // Update
// router.delete("/:id", deleteMealPlan);  // Delete

// export default router;

// import { Router } from "express";
// import { createMealPlan, getMealPlans, deleteMealPlan } from "../controllers/mealPlan.controller";
// import { authenticate } from "../middleware/auth";

// const router = Router();

// // Protected routes
// router.use(authenticate);

// router.post("/", createMealPlan);
// router.get("/", getMealPlans);
// router.delete("/:id", deleteMealPlan);

// export default router;

import { Router } from "express";
import { createMealPlan, getMealPlans, deleteMealPlan } from "../controllers/mealPlan.controller";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(authenticate); // protect all routes

router.post("/", createMealPlan);
router.get("/", getMealPlans);
router.delete("/:id", deleteMealPlan);

export default router;
