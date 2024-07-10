import { NewReviewEntry } from "../../@types/review";
import { isString, isNumber, isInt, isPositive, isRating } from "./typeGuards";

const validateContent = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("Incorrect or missing content");
  }
  return text;
};

const validateRating = (rating: unknown): number => {
  if (
    !isNumber(rating) ||
    !isInt(rating) ||
    !isPositive(rating) ||
    !isRating(rating)
  ) {
    throw new Error("Incorrect or missing rating");
  }
  return rating;
};

export const toNewReview = (object: unknown): NewReviewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("content" in object && "rating" in object && "date" in object) {
    const newReview: NewReviewEntry = {
      content: validateContent(object.content),
      rating: validateRating(object.rating),
      date: validateContent(object.date),
    };

    return newReview;
  }

  throw new Error("Incorrect data: a field missing");
};
