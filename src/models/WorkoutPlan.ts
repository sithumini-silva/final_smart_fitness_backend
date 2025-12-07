import mongoose, { Document, Schema } from "mongoose";

export interface IWorkoutPlan extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    exercises: string[];
    fitnessGoal: string;
}

const workoutPlanSchema = new Schema<IWorkoutPlan>({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    exercises: [{ type: String, required: true }],
    fitnessGoal: { type: String, default: "" }
});

export const WorkoutPlan = mongoose.model<IWorkoutPlan>("WorkoutPlan", workoutPlanSchema);
