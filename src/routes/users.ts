import express from "express";
import userController from "../controller/user";

const usersRouter = express.Router();

usersRouter.post("/", userController.createUser);

export default usersRouter;
