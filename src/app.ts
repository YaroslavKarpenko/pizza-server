import express from "express";
import cookieParser from "cookie-parser";

import cors from "cors";

import pizzasRouter from "./routes/pizzas";
import usersRouter from "./routes/users";
import reviewsRouter from "./routes/reviews";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import mongo from "./middleware/mongo";

import requestLogger from "./middleware/requestLogger";
// import errorHandler from "./middleware/errorHandler";
import unknownEndpoint from "./middleware/unknownEndpoint";
import addSession from "./middleware/addSession";
import extendSession from "./middleware/extendSession";

require("express-async-errors");

mongo.connectToMongoDB();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors<express.Request>(corsOptions));
// app.use(express.static("dist"));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(addSession);
app.use(extendSession);

app.use("/api/pizzas", pizzasRouter);
app.use("/api/users", usersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

app.use(unknownEndpoint);
// app.use(errorHandler);

export default app;
