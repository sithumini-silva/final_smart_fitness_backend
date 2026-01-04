# 🏋️‍♂️ Smart Fitness Backend

## 📑 Table of Contents
1. [Project Overview](#🌟-project-overview)  
2. [Technologies & Tools](#🛠️-technologies--tools)  
3. [Features](#✨-features)  
4. [Installation & Setup](#⚙️-installation--setup)  
5. [Environment Variables](#🔧-environment-variables)  
6. [API Endpoints](#🌐-api-endpoints)  
7. [Deployment](#🚀-deployment)  
8. [Contributors](#👥-contributors)  

---

## 🌟 Project Overview
Smart Fitness Backend is a **Node.js, Express, and MongoDB** application developed using **TypeScript**.  
It powers a full-stack fitness application that allows users to:

- 🥗 Generate AI-based meal and workout plans  
- 💾 Save and view meal/workout plans  
- 🗑️ Delete existing plans  
- 🔐 Authenticate users securely using JWT  
- ⚡ Maintain a scalable and secure backend for the Smart Fitness platform  

---

## 🛠️ Technologies & Tools
- **Node.js** - Runtime environment  
- **Express.js** - Web framework  
- **TypeScript** - Typed JavaScript for maintainability  
- **MongoDB Atlas** - Cloud database  
- **Mongoose** - ODM for MongoDB  
- **JWT (jsonwebtoken)** - Authentication & Authorization  
- **bcryptjs** - Password hashing  
- **dotenv** - Environment variable management  
- **Nodemon** - Development auto-reloading  

---

## ✨ Features
- 🔑 **User Authentication:** Registration, login, JWT-based access & refresh tokens  
- 🥗 **Meal Plan Management:** CRUD operations for meal plans  
- 💪 **Workout Plan Management:** CRUD operations for workout plans  
- 🤖 **AI Integration:** Generate meal and workout plans based on user preferences  
- 🔒 **Secure Backend:** Password encryption, token validation, and protected routes  

---

## ⚙️ Installation & Setup
1. **Clone the repository**
   - git clone https://github.com/sithumini-silva/final_smart_fitness_backend.git
     cd final_smart_fitness_backend
     
2. **Install dependencies**
    - npm install

3.**Create .env file in the root folder and add your environment variables**

# MongoDB
    MONGO_URI=your_mongodb_connection_string

# JWT
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_refresh_token_secret
    JWT_ACCESS_EXPIRES=15m
    JWT_REFRESH_EXPIRES=7d

# Server
    SERVER_PORT=5000


4.**Run the server**
  - npm run dev
  - Server should now run on http://localhost:5000

---

🌐 API Endpoints

# Auth
    POST /api/auth/register - Register a new user
    POST /api/auth/login - Login user
    POST /api/auth/refresh - Refresh JWT token

# Meal Plans
    GET /api/meals - Get all meal plans
    POST /api/meals - Create a new meal plan
    DELETE /api/meals/:id - Delete a meal plan

# Workouts
    GET /api/workouts - Get all workout plans
    POST /api/workouts - Create a new workout plan
    DELETE /api/workouts/:id - Delete a workout plan

🔒 All protected routes require JWT authentication in headers

---

🚀 Deployment
    - MongoDB Atlas is used for cloud database
    - Free deployment options tried: Vercel, Render, Cyclic, Fly.io, Railway (some require payment or verification)
    - Backend can be deployed using any Node.js hosting supporting environment variables

---

👥 Contributors

  Sithumini Chathurya - GDSE 71 Batch
  
  GitHub: sithumini-silva
  
  Role: Full Stack Developer, Backend Implementation






