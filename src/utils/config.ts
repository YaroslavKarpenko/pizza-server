require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const REDIS_SECRET = process.env.REDIS_SECRET;
const REDIS_URI = process.env.REDIS_URI;

export default {
  MONGODB_URI,
  PORT,
  REDIS_SECRET,
  REDIS_URI,
};
