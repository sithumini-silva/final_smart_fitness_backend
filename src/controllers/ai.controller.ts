import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

// Optional: import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateSmartMealPlan = async (req: AuthRequest, res: Response) => {
    try {
        // 1. Get user data (Height/Weight) to customize the plan
        const user = await User.findById(req.user.sub);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { height, weight, fullname } = user;

        // 2. Simple logic to simulate AI personalization (Mock implementation)
        // If you have an API Key, replace this logic with an actual API call.
        const bmi = weight / ((height / 100) * (height / 100));
        let goal = "Maintain Weight";
        if (bmi > 25) goal = "Weight Loss";
        if (bmi < 18.5) goal = "Weight Gain";

        const aiSuggestion = {
            user: fullname,
            calculatedBMI: bmi.toFixed(2),
            fitnessGoal: goal,
            suggestion: `Based on your BMI of ${bmi.toFixed(2)}, we recommend a ${goal} diet.`,
            generatedMeals: [
                "Breakfast: Oatmeal with berries and nuts",
                "Lunch: Grilled chicken salad with quinoa",
                "Dinner: Steamed fish with broccoli"
            ]
        };

        res.status(200).json({
            message: "AI Meal Plan generated successfully",
            data: aiSuggestion
        });

    } catch (error: any) {
        res.status(500).json({ message: "AI Service Error", error: error.message });
    }
};