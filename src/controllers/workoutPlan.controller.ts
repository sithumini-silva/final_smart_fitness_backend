import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { WorkoutPlan } from "../models/WorkoutPlan";
import { User } from "../models/User";

// Workout generator with BMI logic
const beginnerExercises = [
    "10-minute warm-up walk",
    "Bodyweight squats – 3 sets of 12",
    "Push-ups – 3 sets of 10",
    "Plank – 30 seconds",
];

const weightLossExercises = [
    "HIIT – 20 minutes",
    "Jump rope – 3 minutes",
    "Burpees – 3 sets of 10",
    "Mountain climbers – 3 sets of 20",
];

const weightGainExercises = [
    "Deadlifts – 4 sets of 6",
    "Bench press – 4 sets of 8",
    "Squats – 4 sets of 8",
    "Protein shake post-workout",
];

export const generateWorkoutPlan = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.sub);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { height, weight, fullname } = user;
        const bmi = weight / ((height / 100) ** 2);

        let exercises = beginnerExercises;
        let fitnessGoal = "Maintain Fitness";

        if (bmi > 25) {
            exercises = weightLossExercises;
            fitnessGoal = "Weight Loss";
        } else if (bmi < 18.5) {
            exercises = weightGainExercises;
            fitnessGoal = "Weight Gain";
        }

        const response = {
            user: fullname,
            calculatedBMI: bmi.toFixed(2),
            fitnessGoal,
            exercises,
        };

        res.status(200).json({
            message: "Workout plan generated",
            data: response,
        });

    } catch (err: any) {
        res.status(500).json({ message: "Workout AI Error", error: err.message });
    }
};

export const saveWorkoutPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { exercises, fitnessGoal } = req.body;

        const plan = new WorkoutPlan({
            userId: req.user.sub,
            date: new Date(),
            exercises,
            fitnessGoal
        });

        await plan.save();
        res.status(201).json({ message: "Workout plan saved", data: plan });

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getWorkoutPlans = async (req: AuthRequest, res: Response) => {
    try {
        const plans = await WorkoutPlan.find({ userId: req.user.sub }).sort({ date: -1 });
        res.status(200).json({ data: plans });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteWorkoutPlan = async (req: AuthRequest, res: Response) => {
    try {
        await WorkoutPlan.findOneAndDelete({ _id: req.params.id, userId: req.user.sub });
        res.status(200).json({ message: "Workout plan deleted" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
