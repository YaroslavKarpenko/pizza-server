import { RequestHandler } from "express";

const unknownEndpoint: RequestHandler = (_req, res, _next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export default unknownEndpoint;
