import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const variantSchema = new Schema(
  {
    attributes: [
      {
        attributeId: {
          type: Schema.Types.ObjectId,
          ref: "Attribute",
          required: true,
        },
        valueId: {
          type: Schema.Types.ObjectId,
          ref: "AttributeValue",
          required: true,
        },
      },
    ],
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    stock: { type: Number, required: true },
    sku: { type: String, required: true },
  },
  { _id: true }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    shortDescription: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    seoTitle: { type: String },
    seoDescription: { type: String },
    tags: { type: [String], default: [] },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    variants: [variantSchema],
  },
  { versionKey: false, timestamps: true }
);

productSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.index({ "variants.attributes.attributeId": 1 });
productSchema.index({ "variants.attributes.valueId": 1 });

export default mongoose.model("Product", productSchema);
