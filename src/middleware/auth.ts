// // auth.ts
// // auth.middlewares.ts
// // authMiddlewares.ts
// import { NextFunction, Request, Response } from "express"
// import jwt from "jsonwebtoken"
// import dotenv from "dotenv"
// dotenv.config()

// const JWT_SECRET = process.env.JWT_SECRET as string

// export interface AuthRequest extends Request {
//   user?: any
// }

// export const authenticate = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" })
//   }
//   //   Bearer fjhkuvjdjbknlmd
//   const token = authHeader.split(" ")[1] // ["Bearer", "fjhkuvjdjbknlmd"]
//   try {
//     const payload = jwt.verify(token, JWT_SECRET)
//     req.user = payload
//     next()
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expire token" })
//   }
// }

// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET as string;

// export interface AuthRequest extends Request {
//   user?: any;
// }

// export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1]; // Bearer <token>
//   try {
//     const payload = jwt.verify(token, JWT_SECRET);
//     req.user = payload;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  // fallback to cookie
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
