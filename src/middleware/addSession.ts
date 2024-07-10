import session, { SessionOptions } from "express-session";
import Redis from "ioredis";
import config from "../utils/config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const RedisStore = require("connect-redis").default;

// if run as proxy
// app.set('trust proxy', 1);

export const redisClient = new Redis(config.REDIS_URI!);

redisClient.on("error", (error) => {
  console.error("Ошибка Redis:", error);
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const redisStore = new RedisStore({
  client: redisClient,
});

const sessionOptions: SessionOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  store: redisStore,
  secret: config.REDIS_SECRET!,
  saveUninitialized: false,
  resave: false,
  name: "sessionId",
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 48 },
};

const addSession = session(sessionOptions);

export default addSession;
