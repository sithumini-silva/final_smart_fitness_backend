// import mongoose, { Document, Schema } from "mongoose"

// export enum Role {
//   ADMIN = "ADMIN",
//   USER = "USER"
// }

// export interface IUser extends Document {
//   _id: mongoose.Types.ObjectId
//   fullname: string
//   email: string
//   password: string
//   height:number
//   weight:number
//   roles: Role[]
// }

// const userSchema = new Schema<IUser>({
//   fullname: { type: String, required: true },
//   email: { type: String, unique: true, lowercase: true },
//   password: { type: String, required: true },
//   height: { type:Number, required: true},
//   weight: { type:Number, required: true},
//   roles: { type: [String], enum: Object.values(Role), default: [Role.USER] },
// })

// export const User = mongoose.model<IUser>("User", userSchema)

import mongoose, { Document } from "mongoose";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  roles: Role[];
}

const userSchema = new mongoose.Schema<IUser>({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  roles: { type: [String], enum: Object.values(Role), default: [Role.USER] },
});

export const User = mongoose.model<IUser>("User", userSchema);
