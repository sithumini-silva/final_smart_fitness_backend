import { Response } from "express";
import { MealPlan } from "../models/MealPlan";
import { AuthRequest } from "../middleware/auth";

// 1. Create Meal Plan
export const createMealPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.sub;
    const { date, meals } = req.body;

    if (!date || !meals || !Array.isArray(meals)) {
      return res.status(400).json({ message: "Date and meals array are required" });
    }

    const newMealPlan = new MealPlan({ userId, date, meals });
    await newMealPlan.save();

    res.status(201).json({ message: "Meal plan created", data: newMealPlan });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Get All Meal Plans
export const getMealPlans = async (req: AuthRequest, res: Response) => {
  try {
    const plans = await MealPlan.find({ userId: req.user.sub }).sort({ date: -1 });
    res.status(200).json({ data: plans });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Get Single Meal Plan by ID (NEW)
export const getMealPlanById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    // Ensure the user can only access their own plans
    const plan = await MealPlan.findOne({ _id: id, userId: req.user.sub });

    if (!plan) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    res.status(200).json({ data: plan });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Update Meal Plan (NEW)
export const updateMealPlan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { date, meals } = req.body;

    // Find and update only if it belongs to the logged-in user
    const updatedPlan = await MealPlan.findOneAndUpdate(
        { _id: id, userId: req.user.sub },
        { date, meals },
        { new: true } // Return the updated document
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    res.status(200).json({ message: "Meal plan updated", data: updatedPlan });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// 5. Delete Meal Plan
export const deleteMealPlan = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await MealPlan.findOneAndDelete({ _id: id, userId: req.user.sub });

    if (!deleted) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    res.status(200).json({ message: "Meal plan deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};