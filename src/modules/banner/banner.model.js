import mongoose, { Schema } from "mongoose";

const bannerModel = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  slug: { type: String },
  imageUrl: { type: String },
});

export default mongoose.model("Banner", bannerModel);
