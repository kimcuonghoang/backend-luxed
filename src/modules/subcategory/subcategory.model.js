import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const subCategoryModel = new Schema(
  {
    parentCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: { type: String, required: true },
    logoUrl: { type: String },
    description: { type: String },
    slug: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);
subCategoryModel.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
export default mongoose.model("SubCategory", subCategoryModel);
