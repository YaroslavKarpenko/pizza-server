/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { login as loginService } from "../services/auth";

import { RequestHandler } from "express";
import { validateCredentials } from "../utils/validation/auth";

const login: RequestHandler = async (req, res) => {
  try {
    const credentials = validateCredentials(req.body);

    const user = await loginService(req, res, credentials);

    if (req.session) {
      console.log(user.id);
      req.session.userId = user.id;
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            return reject(new Error("Failed to save session"));
          }
          resolve();
        });
      });
      res.status(200).json(user);
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(401).send(errorMessage);
  }
};

const logout: RequestHandler = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw new Error("Failed to log out");
      }
      res.clearCookie("sessionId");
      res.json({ success: true });
    });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(500).send(errorMessage);
  }
};

export default { login, logout };
