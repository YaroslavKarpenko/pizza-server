import mongoose, { Types, Document } from "mongoose";

// const isValidISODate = (value: string) => {
//   return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value);
// };

const reviewSchema = new mongoose.Schema({
  content: { type: String, required: true, minlength: 5, maxlength: 1000 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: {
    type: String,
    required: true,
    // validate: {
    //   validator: isValidISODate,
    //   message: "Date should be in ISO8601 format",
    // },
  },
  pizza: { type: mongoose.Schema.Types.ObjectId, ref: "Pizza" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export interface ReviewDocument {
  id: string;
  __v: unknown;
  _id?: Types.ObjectId;
  content: string;
  rating: number;
  date: string;
  pizza: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId[];
}

reviewSchema.set("toJSON", {
  transform: (
    _doc: Document<unknown, unknown, unknown> & { _id: Types.ObjectId },
    ret: Record<string, unknown>
  ) => {
    const returnedObject = ret as unknown as ReviewDocument;
    if (returnedObject._id instanceof Types.ObjectId) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
