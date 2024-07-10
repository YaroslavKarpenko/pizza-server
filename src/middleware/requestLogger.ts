import { RequestHandler } from "express";
import logger from "../utils/logger";

const requestLogger: RequestHandler = (req, _res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", JSON.stringify(req.body));
  logger.info("---");
  next();
};

export default requestLogger;
