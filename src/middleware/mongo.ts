import mongoose from "mongoose";
import logger from "../utils/logger";
import config from "../utils/config";

const connectToMongoDB = () => {
  mongoose.set("strictQuery", false);

  logger.info("connecting to", config.MONGODB_URI!);

  mongoose
    .connect(config.MONGODB_URI!)
    .then(() => {
      logger.info("connected to MongoDB");
    })
    .catch((error: Error) => {
      logger.error("error connection to MongoDB:", error.message);
    });
};

export default { connectToMongoDB };
