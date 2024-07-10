import { RequestHandler } from "express";
import { redisClient } from "./addSession";
import { SessionData } from "express-session";

const checkAuth: RequestHandler = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const sessionData = await redisClient.get(`sess:${req.sessionID}`);
      console.log("sessId: ", req.sessionID);
      if (sessionData) {
        const session = JSON.parse(sessionData) as SessionData;
        if (session.userId === req.session.userId) {
          return next();
        } else {
          return res
            .status(401)
            .json({ message: "Unauthorized: Session token mismatch" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized: Session not found in Redis" });
      }
    } catch (error) {
      console.error("Internal server error during session check:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: No session" });
  }
};

export default checkAuth;
