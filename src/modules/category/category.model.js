import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
const categorySchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String },
    logoUrl: { type: String },
    slug: { type: String, unique: true },
    deletedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);
categorySchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
export default mongoose.model("Category", categorySchema);
