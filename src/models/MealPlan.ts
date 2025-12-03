// // models/MealPlan.ts
// import mongoose, { Document, Schema } from "mongoose";

// export interface IMealPlan extends Document {
//   userId: mongoose.Types.ObjectId;
//   date: Date;
//   meals: string[];
// }

// const mealPlanSchema = new Schema<IMealPlan>({
//   userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
//   date: { type: Date, required: true },
//   meals: [{ type: String, required: true }],
// });

// export const MealPlan = mongoose.model<IMealPlan>("MealPlan", mealPlanSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IMealPlan extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  meals: string[];
}

const mealPlanSchema = new Schema<IMealPlan>({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  meals: [{ type: String, required: true }],
});

export const MealPlan = mongoose.model<IMealPlan>("MealPlan", mealPlanSchema);
