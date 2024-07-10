import mongoose, { Types, Document } from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  feedback: { type: Number, required: true },
  doughTypes: [{ type: String }],
  sizes: [{ type: String }],
  price: { type: Number, required: true },
  img: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

interface PizzaDocument {
  __v?: unknown;
  _id?: Types.ObjectId;
  id: string;
  name: string;
  origin: string;
  category: string;
  rating: number;
  feedback: number;
  doughTypes: string[];
  sizes: string[];
  price: number;
  img: string;
  reviews: mongoose.Types.ObjectId[];
}

pizzaSchema.set("toJSON", {
  transform: (
    _doc: Document<unknown, unknown, unknown> & { _id: Types.ObjectId },
    ret: Record<string, unknown>
  ) => {
    const returnedObject = ret as unknown as PizzaDocument;
    if (returnedObject._id instanceof Types.ObjectId) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const pizzaModel = mongoose.model("Pizza", pizzaSchema);

export default pizzaModel;
