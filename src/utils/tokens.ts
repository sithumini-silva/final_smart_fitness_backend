import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

// These will now load correctly because dotenv runs first in index.ts
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_123";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_123";
const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRES || "7d";

export const signAccessToken = (user: IUser) => {
  return jwt.sign(
      { sub: user._id, role: user.roles },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY } // Uses "15m" from .env
  );
};

export const signRefreshToken = (user: IUser) => {
  return jwt.sign(
      { sub: user._id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY } // Uses "7d" from .env
  );
};