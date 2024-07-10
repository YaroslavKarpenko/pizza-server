import express from "express";
import authController from "../controller/auth";

import checkAuth from "../middleware/checkAuth";

const loginRouter = express.Router();

loginRouter.post("/", authController.login);

loginRouter.use(checkAuth);

loginRouter.get("/", (_req, res) => {
  res.json({ message: "this message only for authorized users" });
});

export default loginRouter;
