import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema(
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
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    stock: { type: Number, required: true },
    soldCount: { type: Number, default: 0 },
    image: { type: String },
    sku: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Variant", variantSchema);
