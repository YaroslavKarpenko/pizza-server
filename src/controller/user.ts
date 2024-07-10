import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import User from "../models/user";
import { toNewUser } from "../utils/validation/user";

const createUser: RequestHandler = async (req, res) => {
  try {
    const { email, name, password } = toNewUser(req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("user exists");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, name, passwordHash });

    const savedUser = await user.save();

    res
      .status(201)
      .json({
        email: savedUser.email,
        name: savedUser.name,
        id: savedUser._id.toString(),
      });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
};

export default { createUser };
