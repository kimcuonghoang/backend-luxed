import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    description: { type: String },
    shortDescription: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, required: true },
    thumbnail: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "ProductColor",
      required: true,
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: "ProductSize",
      required: true,
    },
    stock: { type: Number, required: true },
    soldCount: { type: Number, default: 0 },

    seoTitle: { type: String },
    seoDescription: { type: String },
    tags: { type: [String], default: [] },

    deletedAt: { type: Date, default: null },

    deletedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
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
