import mongoose, { Schema } from "mongoose";
import { PRODUCT_COLORS } from "../../common/constants/productColor";
import { PRODUCT_SIZES } from "../../common/constants/productSize";

const orderItemModel = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number },
  price: { type: Number },
  color: { enum: PRODUCT_COLORS },
  size: { enum: PRODUCT_SIZES },
});

export default mongoose.model("OrderItem", orderItemModel);
