import { RequestHandler } from "express";

const extendSession: RequestHandler = (req, _res, next) => {
  if (req.session) {
    req.session.touch();
  }
  next();
};

export default extendSession;
