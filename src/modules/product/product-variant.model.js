import mongoose, { Schema } from "mongoose";

const productVariantSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    color: { type: Schema.Types.ObjectId, ref: "ProductColor", required: true },
    size: { type: Schema.Types.ObjectId, ref: "ProductSize", required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    stock: { type: Number, required: true },
    soldCount: { type: Number, default: 0 },
    image: { type: String },
    sku: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("ProductVariant", productVariantSchema);
