import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

// --------------------
// MEAL DATABASE with metadata
// --------------------

interface MealItem {
    name: string;
    diet: string[];   // Vegan / Vegetarian / Keto / Low-Carb etc.
    goal: string[];   // Weight Loss / Weight Gain / Maintain Weight
}

const breakfastOptions: MealItem[] = [
    { name: "Oatmeal with berries", diet: ["Vegan", "Vegetarian"], goal: ["Weight Loss", "Maintain Weight"] },
    { name: "Scrambled eggs with spinach", diet: ["Vegetarian"], goal: ["Weight Gain", "Maintain Weight"] },
    { name: "Yogurt with nuts", diet: ["Vegetarian"], goal: ["Weight Gain"] },
    { name: "Fruit smoothie bowl", diet: ["Vegan", "Vegetarian"], goal: ["Weight Loss"] },
    { name: "Peanut butter toast with banana", diet: ["Vegan", "Vegetarian"], goal: ["Maintain Weight"] },
    { name: "Boiled eggs with avocado", diet: ["Keto", "Low-Carb"], goal: ["Weight Loss", "Maintain Weight"] },
    { name: "Protein pancake with honey", diet: ["Vegetarian"], goal: ["Weight Gain"] }
];

const lunchOptions: MealItem[] = [
    { name: "Grilled chicken salad", diet: ["Keto", "Low-Carb"], goal: ["Weight Loss"] },
    { name: "Tuna salad with avocado", diet: ["Keto"], goal: ["Weight Loss"] },
    { name: "Vegetable stir fry with rice", diet: ["Vegan", "Vegetarian"], goal: ["Weight Gain"] },
    { name: "Quinoa bowl with veggies", diet: ["Vegan", "Vegetarian"], goal: ["Maintain Weight"] },
    { name: "Turkey wrap with hummus", diet: [], goal: ["Maintain Weight"] },
    { name: "Healthy chicken fried rice", diet: [], goal: ["Weight Gain"] },
    { name: "Grilled tofu with vegetables", diet: ["Vegan", "Vegetarian"], goal: ["Weight Loss"] }
];

const dinnerOptions: MealItem[] = [
    { name: "Steamed fish with broccoli", diet: ["Keto", "Low-Carb"], goal: ["Weight Loss"] },
    { name: "Chicken curry with brown rice", diet: [], goal: ["Weight Gain"] },
    { name: "Beef stir fry with vegetables", diet: ["Keto"], goal: ["Weight Gain"] },
    { name: "Veggie pasta with olive oil", diet: ["Vegetarian"], goal: ["Weight Gain"] },
    { name: "Grilled salmon with asparagus", diet: ["Keto"], goal: ["Maintain Weight"] },
    { name: "Mixed vegetable soup with garlic bread", diet: ["Vegan", "Vegetarian"], goal: ["Weight Loss"] },
    { name: "Baked sweet potato with grilled chicken", diet: [], goal: ["Maintain Weight"] }
];

// --------------------
// FILTER + RANDOM HELPERS
// --------------------

function filterMeals(list: MealItem[], diets: string[], goal: string) {
    return list.filter(meal =>
        (diets.length === 0 || meal.diet.some(d => diets.includes(d))) &&
        meal.goal.includes(goal)
    );
}

function pickRandom(list: MealItem[]) {
    if (!list || list.length === 0) return "No suitable meal found for your options.";
    const index = Math.floor(Math.random() * list.length);
    return list[index].name;
}

// --------------------
// MAIN AI CONTROLLER
// --------------------

export const generateSmartMealPlan = async (req: AuthRequest, res: Response) => {
    try {
        console.log("🔍 Incoming AI Generate Request:", req.body);

        const user = await User.findById(req.user.sub);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { dietPreferences = [], fitnessGoal } = req.body;

        console.log("👤 User:", user.fullname);
        console.log("🥗 Diet Preferences:", dietPreferences);
        console.log("🎯 Fitness Goal:", fitnessGoal);

        // --------------------
        // APPLY FILTERING
        // --------------------
        const breakfastFiltered = filterMeals(breakfastOptions, dietPreferences, fitnessGoal);
        const lunchFiltered = filterMeals(lunchOptions, dietPreferences, fitnessGoal);
        const dinnerFiltered = filterMeals(dinnerOptions, dietPreferences, fitnessGoal);

        console.log("🍳 Breakfast Options After Filter:", breakfastFiltered);
        console.log("🍛 Lunch Options After Filter:", lunchFiltered);
        console.log("🍽 Dinner Options After Filter:", dinnerFiltered);

        // --------------------
        // RANDOM SELECTION
        // --------------------
        const breakfast = pickRandom(breakfastFiltered);
        const lunch = pickRandom(lunchFiltered);
        const dinner = pickRandom(dinnerFiltered);

        console.log("🎉 Final Meals:", { breakfast, lunch, dinner });

        // --------------------
        // SEND RESPONSE
        // --------------------
        res.status(200).json({
            message: "AI Meal Plan generated successfully",
            data: {
                generatedMeals: [
                    `Breakfast: ${breakfast}`,
                    `Lunch: ${lunch}`,
                    `Dinner: ${dinner}`
                ]
            }
        });

    } catch (error: any) {
        console.error("❌ AI Generator Error:", error);
        res.status(500).json({ message: "AI Service Error", error: error.message });
    }
};
