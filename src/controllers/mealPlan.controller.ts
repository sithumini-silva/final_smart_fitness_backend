// // controllers/mealPlan.controller.ts
// import { Request, Response } from "express";
// import { MealPlan } from "../models/MealPlan";
// import { AuthRequest } from "../middleware/auth";

// // Create a new meal plan
// export const createMealPlan = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user.sub;
//     const { date, meals } = req.body;

//     if (!date || !meals || !Array.isArray(meals)) {
//       return res.status(400).json({ message: "Date and meals array are required" });
//     }

//     const newMealPlan = new MealPlan({ userId, date, meals });
//     await newMealPlan.save();

//     res.status(201).json({ message: "Meal plan created", data: newMealPlan });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all meal plans for current user
// export const getMealPlans = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user.sub;
//     const plans = await MealPlan.find({ userId }).sort({ date: -1 });
//     res.status(200).json({ data: plans });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get single meal plan by id
// export const getMealPlanById = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params;
//     const plan = await MealPlan.findById(id);
//     if (!plan) return res.status(404).json({ message: "Meal plan not found" });
//     res.status(200).json({ data: plan });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update meal plan by id
// export const updateMealPlan = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { date, meals } = req.body;

//     const updated = await MealPlan.findByIdAndUpdate(
//       id,
//       { date, meals },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Meal plan not found" });
//     res.status(200).json({ message: "Meal plan updated", data: updated });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete meal plan
// export const deleteMealPlan = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deleted = await MealPlan.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: "Meal plan not found" });
//     res.status(200).json({ message: "Meal plan deleted" });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// import { Request, Response } from "express";
// import { MealPlan } from "../models/MealPlan";
// import { AuthRequest } from "../middleware/auth";

// // Create
// export const createMealPlan = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user.sub;
//     const { date, meals } = req.body;
//     if (!date || !meals || !Array.isArray(meals))
//       return res.status(400).json({ message: "Date and meals array are required" });

//     const newMealPlan = new MealPlan({ userId, date, meals });
//     await newMealPlan.save();

//     res.status(201).json({ message: "Meal plan created", data: newMealPlan });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all for user
// export const getMealPlans = async (req: AuthRequest, res: Response) => {
//   try {
//     const plans = await MealPlan.find({ userId: req.user.sub }).sort({ date: -1 });
//     res.status(200).json({ data: plans });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete
// export const deleteMealPlan = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deleted = await MealPlan.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: "Meal plan not found" });

//     res.status(200).json({ message: "Meal plan deleted" });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

import { Response } from "express";
import { MealPlan } from "../models/MealPlan";
import { AuthRequest } from "../middleware/auth";

// Create meal plan
export const createMealPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.sub;
    const { date, meals } = req.body;
    if (!date || !meals || !Array.isArray(meals))
      return res.status(400).json({ message: "Date and meals array are required" });

    const newMealPlan = new MealPlan({ userId, date, meals });
    await newMealPlan.save();
    res.status(201).json({ message: "Meal plan created", data: newMealPlan });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get all meal plans for user
export const getMealPlans = async (req: AuthRequest, res: Response) => {
  try {
    const plans = await MealPlan.find({ userId: req.user.sub }).sort({ date: -1 });
    res.status(200).json({ data: plans });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Delete meal plan
export const deleteMealPlan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await MealPlan.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Meal plan not found" });

    res.status(200).json({ message: "Meal plan deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
