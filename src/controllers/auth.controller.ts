// import { Request, Response } from "express"
// import { IUser, Role, User } from "../models/User"
// import bcrypt from "bcryptjs"
// import { signAccessToken, signRefreshToken } from "../utils/tokens"
// import { AuthRequest } from "../middleware/auth"
// import jwt from "jsonwebtoken"
// import dotenv from "dotenv"
// dotenv.config()
// import { sign } from "crypto"


// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string

// //      register

// export const register = async (req: Request, res: Response) => {
//   try {
//     const { fullname, email, password, height, weight } = req.body

//     // data validation
//     if (!fullname|| !email || !password || !height || !weight) {
//       return res.status(400).json({ message: "All fields are required" })
//     }

//     const existingUser = await User.findOne({ email })
//     if (existingUser) {
//       return res.status(400).json({ message: "Email alrady registered" })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const newUser = new User({
//       fullname,
//       email,
//       password: hashedPassword,
//       height,
//       weight,
//       roles: [Role.USER]
//     })

//     await newUser.save()

//     res.status(201).json({
//       message: "User registered successfully",
//       data: {
//         id: newUser._id,
//         email: newUser.email,
//         roles: newUser.roles
//       }
//     })
//   } catch (err: any) {
//     res.status(500).json({ message: err?.message })
//   }
// }

// //      login

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body

//     const existingUser = await User.findOne({ email })
//     if (!existingUser) {
//       return res.status(401).json({ message: "Invalid credentials" })
//     }

//     const valid = await bcrypt.compare(password, existingUser.password)
//     if (!valid) {
//       return res.status(401).json({ message: "Invalid credentials" })
//     }

//     const accessToken = signAccessToken(existingUser)
//     const refreshToken = signRefreshToken(existingUser)

//     // res.status(200).json({
//     //   message: "success",
//     //   data: {
//     //     email: existingUser.email,
//     //     roles: existingUser.roles,
//     //     accessToken,
//     //     refreshToken
//     //   }
//     // })
//     res.status(200).json({
//   message: "success",
//   data: {
//     fullname: existingUser.fullname,
//     email: existingUser.email,
//     roles: existingUser.roles,
//     height: existingUser.height,
//     weight: existingUser.weight,
//     accessToken,
//     refreshToken
//   }
// });

//   } catch (err: any) {
//     res.status(500).json({ message: err?.message })
//   }
// }


// //      get my details

// export const getMyDetails = async (req: AuthRequest, res: Response) => {
//   // const roles = req.user.roles
//   if (!req.user) {
//     return res.status(401).json({ message: "Unauthorized" })
//   }

// //   const userId = req.user.sub
// //   const user =
// //     ((await User.findById(userId).select("-password")) as IUser) || null

// //   if (!user) {
// //     return res.status(404).json({
// //       message: "User not found"
// //     })
// //   }

// const user = (await User.findById(req.user.sub).select("-password")) as IUser
//   if (!user) return res.status(404).json({ message: "User not found" })

//  res.status(200).json({
//     message: "Ok",
//     data: {
//       fullname: user.fullname,
//       email: user.email,
//       height: user.height,
//       weight: user.weight,
//       roles: user.roles,
//     },
//   })
// }


// //      register admin

// export const registerAdmin = async (req: Request, res: Response) => {
//     try {
//     const { fullname, email, password } = req.body
//     if (!fullname || !email || !password)
//       return res.status(400).json({ message: "All fields are required" })

//     const existingUser = await User.findOne({ email })
//     if (existingUser)
//       return res.status(400).json({ message: "Email already registered" })

//     const hashedPassword = await bcrypt.hash(password, 10)
//     const newAdmin = new User({
//       fullname,
//       email,
//       password: hashedPassword,
//       height: 0,
//       weight: 0,
//       roles: [Role.ADMIN],
//     })
//     await newAdmin.save()

//     res.status(201).json({ message: "Admin registered successfully" })
//   } catch (err: any) {
//     res.status(500).json({ message: err?.message })
//   }
// }


// //          handle refresh token

// export const handleRefreshToken = async (req: Request, res: Response) => {
//   try {
//     const { token } = req.body
//     if (!token) {
//       return res.status(400).json({ message: "Refresh token is required" })
//     }

//     // Verify refresh token
//     const payload = jwt.verify(token,JWT_REFRESH_SECRET)
//     const user = await User.findById(payload.sub)
//       if (!user) {
//         return res.status(403).json({ message: "Invalid refresh token" })
//       }
//     const accessToken = signAccessToken(user)
//     res.status(200).json({ accessToken })
//   } catch (err) {
//     res.status(403).json({ message: "Invalid of expire token" })
//   }
// }
// import { Request, Response } from "express";
// import { IUser, Role, User } from "../models/User";
// import bcrypt from "bcryptjs";
// import { signAccessToken, signRefreshToken } from "../utils/tokens";
// import { AuthRequest } from "../middleware/auth";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// // Register user
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { fullname, email, password, height, weight } = req.body;
//     if (!fullname || !email || !password || !height || !weight)
//       return res.status(400).json({ message: "All fields are required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ fullname, email, password: hashedPassword, height, weight, roles: [Role.USER] });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully", data: { id: newUser._id, email: newUser.email } });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Login user
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) return res.status(401).json({ message: "Invalid credentials" });

//     const valid = await bcrypt.compare(password, existingUser.password);
//     if (!valid) return res.status(401).json({ message: "Invalid credentials" });

//     const accessToken = signAccessToken(existingUser);
//     const refreshToken = signRefreshToken(existingUser);

//     res.status(200).json({
//       message: "success",
//       data: {
//         fullname: existingUser.fullname,
//         email: existingUser.email,
//         height: existingUser.height,
//         weight: existingUser.weight,
//         roles: existingUser.roles,
//         accessToken,
//         refreshToken
//       }
//     });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get my details
// export const getMyDetails = async (req: AuthRequest, res: Response) => {
//   if (!req.user) return res.status(401).json({ message: "Unauthorized" });

//   const user = await User.findById(req.user.sub).select("-password") as IUser;
//   if (!user) return res.status(404).json({ message: "User not found" });

//   res.status(200).json({
//     message: "Ok",
//     data: {
//       fullname: user.fullname,
//       email: user.email,
//       height: user.height,
//       weight: user.weight,
//       roles: user.roles
//     }
//   });
// };

// // Refresh token
// export const handleRefreshToken = async (req: Request, res: Response) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(400).json({ message: "Refresh token required" });

//     const payload: any = jwt.verify(token, JWT_REFRESH_SECRET);
//     const user = await User.findById(payload.sub);
//     if (!user) return res.status(403).json({ message: "Invalid refresh token" });

//     const accessToken = signAccessToken(user);
//     res.status(200).json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

import { Request, Response } from "express";
import { IUser, Role, User } from "../models/User";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import { AuthRequest } from "../middleware/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, height, weight } = req.body;
    if (!fullname || !email || !password || !height || !weight)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashedPassword, height, weight, roles: [Role.USER] });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken(existingUser);
    const refreshToken = signRefreshToken(existingUser);

    // ✅ Set tokens as HTTP-only cookies
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: false, maxAge: 30 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({
      message: "Login successful",
      data: {
        fullname: existingUser.fullname,
        email: existingUser.email,
        height: existingUser.height,
        weight: existingUser.weight,
        roles: existingUser.roles,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get my details
export const getMyDetails = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(req.user.sub).select("-password") as IUser;
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ data: user });
};

// Refresh token
export const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Refresh token required" });

    const payload: any = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = signAccessToken(user);
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: false, maxAge: 30 * 60 * 1000 });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
