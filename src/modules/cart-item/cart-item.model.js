import { Schema } from "mongoose";

const cartItemModel = new Schema(
  {
    cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    variantId: { type: Schema.Types.ObjectId, ref: "Variant" },
    quantity: { type: Number, default: 1 },
    price: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("CartItem", cartItemModel);
