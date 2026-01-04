import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

// Import DB and Routes
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.routes";
import mealPlanRouter from "./routes/mealPlan.routes";
import aiRouter from "./routes/ai.routes";
import workoutRoutes from "./routes/workoutPlan.routes";  // ✅ Added missing import

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: ["http://localhost:5173","http://localhost:5174", "http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Connect MongoDB
connectDB();

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/meal-plans", mealPlanRouter);
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/workout-plans", workoutRoutes);  // ✅ Fully functional Workout Route

// Health Check Route
app.get("/", (req, res) => {
    res.send("Smart Fitness Backend is Running!");
});

// Start Server
app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server running on port ${SERVER_PORT}`);
});
