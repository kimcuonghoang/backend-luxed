import { Schema } from "mongoose";

const reviewsModel = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number },
    comment: { type: String },
    createdAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Reviews", reviewsModel);
