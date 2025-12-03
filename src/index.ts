// import express from "express"
// import cors from "cors"
// import authRouter from "./routes/auth.routes"
// import dotenv from "dotenv"
// import mongoose from "mongoose"
// dotenv.config()

// const SERVER_PORT = process.env.SERVER_PORT
// const MONGO_URI = process.env.MONGO_URI as string

// const app = express()

// app.use(express.json())
// app.use(
//   cors({
//     origin: ["http://localhost:5173", ""],        // add your frontend URLs here(deployee karapu link eka)
//     methods: ["GET", "POST", "PUT", "DELETE"]
//   })
// )

// app.use("/api/v1/auth", authRouter)

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("DB connected")
//   })
//   .catch((err) => {
//     console.error(`DB connection fail: ${err}`)
//     process.exit(1)
//   })

// app.listen(SERVER_PORT, () => {
//   console.log(`Server is running on ${SERVER_PORT}`)
// })


// import express from "express";
// import cors from "cors";
// import authRouter from "./routes/auth.routes";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import mealPlanRouter from "./routes/mealPlan.routes";

// dotenv.config();

// const SERVER_PORT = process.env.SERVER_PORT;
// const MONGO_URI = process.env.MONGO_URI as string;

// const app = express();

// app.use(express.json());

// // ✅ CORS fix
// app.use(
//   cors({
//     origin: ["http://localhost:5173"], // frontend URL
//     credentials: true, // <-- important
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/v1/meal-plans", mealPlanRouter);

// // MongoDB connection
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("DB connected"))
//   .catch((err) => {
//     console.error(`DB connection fail: ${err}`);
//     process.exit(1);
//   });

// app.listen(SERVER_PORT, () => {
//   console.log(`Server running on port ${SERVER_PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRouter from "./routes/auth.routes";
// import mealPlanRouter from "./routes/mealPlan.routes";

// dotenv.config();

// const SERVER_PORT = process.env.SERVER_PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI as string;

// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     origin: ["http://localhost:5173"], // your frontend URL
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/v1/meal-plans", mealPlanRouter);

// // MongoDB connection
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("DB connected"))
//   .catch((err) => {
//     console.error(`DB connection failed: ${err}`);
//     process.exit(1);
//   });

// app.listen(SERVER_PORT, () => {
//   console.log(`Server running on port ${SERVER_PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import mealPlanRouter from "./routes/mealPlan.routes";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ CORS with credentials
app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/v1/meal-plans", mealPlanRouter);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error(`DB connection failed: ${err}`);
    process.exit(1);
  });

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
