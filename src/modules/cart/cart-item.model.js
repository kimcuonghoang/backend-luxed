import { Schema } from "mongoose";
import { PRODUCT_COLORS } from "../../common/constants/productColor";
import { PRODUCT_SIZES } from "../../common/constants/productSize";

const cartItemModel = new Schema({
  cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  color: { enum: PRODUCT_COLORS },
  size: { enum: PRODUCT_SIZES },
});

export default mongoose.model("CartItem", cartItemModel);
