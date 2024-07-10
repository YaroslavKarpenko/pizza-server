import express from "express";
import reviewController from "../controller/review";
import checkAuth from "../middleware/checkAuth";
const reviewsRouter = express.Router();

reviewsRouter.use(checkAuth);

reviewsRouter.post("/", reviewController.createReview);
reviewsRouter.put("/:id", reviewController.updateReview);

export default reviewsRouter;
