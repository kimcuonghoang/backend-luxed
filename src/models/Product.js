import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);
productSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
export default mongoose.model("Product", productSchema);
