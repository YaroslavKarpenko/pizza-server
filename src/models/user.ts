/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, minLength: 3, maxLength: 32 },
  passwordHash: { type: String, required: true },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

interface UserDocument {
  __v: unknown;
  _id?: mongoose.Types.ObjectId;
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  reviews: mongoose.Types.ObjectId[];
}

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const returnedObject = ret as unknown as UserDocument;
    if (returnedObject._id instanceof Types.ObjectId) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
