import express from "express";
import authController from "../controller/auth";

const logoutRouter = express.Router();

logoutRouter.post("/", authController.logout);

export default logoutRouter;
