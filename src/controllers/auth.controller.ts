import { Request, Response } from "express";
import { IUser, Role, User } from "../models/User";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import { AuthRequest } from "../middleware/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// --- 1. Register User ---
export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, height, weight } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      height: height || 0,
      weight: weight || 0,
      roles: [Role.USER]
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// --- 2. Register Admin (Fixes potential 'undefined' error if routes use it) ---
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      fullname,
      email,
      password: hashedPassword,
      roles: [Role.ADMIN], // Sets Admin Role
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// --- 3. Login ---
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken(existingUser);
    const refreshToken = signRefreshToken(existingUser);

    // Send tokens in HTTP-only cookies for security
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: false });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      data: {
        fullname: existingUser.fullname,
        email: existingUser.email,
        roles: existingUser.roles,
        accessToken,
        refreshToken
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// --- 4. Get My Details ---
export const getMyDetails = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(req.user.sub).select("-password") as IUser;
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ data: user });
};

// Get user measurements (height and weight)
export const getUserMeasurements = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findById(req.user.sub).select("height weight");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      data: {
        height: user.height || 0,
        weight: user.weight || 0,
        heightUnit: 'cm',
        weightUnit: 'kg'
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// --- 5. Refresh Token ---
export const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Refresh token required" });

    const payload: any = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = signAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};