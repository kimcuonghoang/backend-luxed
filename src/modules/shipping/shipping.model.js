import { Schema } from "mongoose";
import { SHIPPING_STATUS } from "../../common/constants/shippingStatus";

const shippingModel = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    carrier: { type: String },
    trackingNumber: { type: String },
    status: { type: String, enum: SHIPPING_STATUS, default: "pending" },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Shipping", shippingModel);
