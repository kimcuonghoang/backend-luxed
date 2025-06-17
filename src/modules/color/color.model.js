import mongoose, { Schema } from "mongoose";

const productColorSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    hexCode: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("ProductColor", productColorSchema);
