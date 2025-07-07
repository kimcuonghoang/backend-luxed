import mongoose, { Schema } from "mongoose";

const orderItemModel = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number },
  price: { type: Number },
  color: { type: String },
  size: { type: String },
});

export default mongoose.model("OrderItem", orderItemModel);
