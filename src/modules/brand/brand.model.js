import mongoose from "mongoose";
import { mongo, Schema } from "mongoose";
import slugify from "slugify";

const brandModel = new Schema(
  {
    title: { type: String, required: true },
    logoUrl: { type: String },
    description: { type: String },
    slug: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);
brandModel.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
export default mongoose.model("Brand", brandModel);
