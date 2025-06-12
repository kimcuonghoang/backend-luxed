import mongoose, { Schema } from "mongoose";

const subCategoryModel = new Schema(
  {
    parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" },

    title: { type: String, required: true },
    logoUrl: { type: String },
    description: { type: String },
    slug: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("SubCategory", subCategoryModel);
