import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { authCredentials } from "../@types/user";

export const login = async (
  _req: Request,
  _res: Response,
  credentials: authCredentials
) => {
  const user = await User.findOne({ email: credentials.email });

  if (!user) {
    throw new Error("User not found");
  }
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(credentials.password, user.passwordHash);

  if (!passwordCorrect) {
    throw new Error("Invalid credentials");
  }
  return user;
};
