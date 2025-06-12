import mongoose, { Schema } from "mongoose";

const cartModel = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Cart", cartModel);
