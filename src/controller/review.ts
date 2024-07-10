/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from "express";
import Pizza from "../models/pizza";
import Review from "../models/review";
import User from "../models/user";
import { toNewReview } from "../utils/validation/review";
import mongoose from "mongoose";

const createReview: RequestHandler = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.body.pizzaId);
    const user = await User.findById(req.body.userId);

    if (pizza && user) {
      const review = new Review({
        ...toNewReview(req.body),
        pizza,
        user,
      });
      const savedReview = await review.save();

      pizza.reviews = pizza.reviews.concat(savedReview._id);
      await pizza.save();

      user.reviews = user.reviews.concat(savedReview._id);
      await user.save();

      res.status(201).json(savedReview);
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
};

const updateReview: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { content, rating, date, pizzaId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review?.user?.toString() !== req.session.userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only edit your own reviews" });
    }

    if (review?.pizza?.toString() !== pizzaId) {
      return res.status(400).json({ message: "Pizza ID does not match" });
    }

    review.content = content;
    review.rating = rating;
    review.date = date;

    await review.save();

    return res.json(review);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    return res.status(400).send(errorMessage);
  }
};

export default { createReview, updateReview };
