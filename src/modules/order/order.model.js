import mongoose, { Schema } from "mongoose";
import { ORDER_STATUS } from "../../common/constants/orderStatus";

const orderModel = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ORDER_STATUS, default: "pending" },
    totalAmount: { type: Number },
    shippingFee: { type: Number },
    paymentStatus: { type: String },
    paymentMethod: { type: String },
    voucher: { type: Schema.Types.ObjectId, ref: "Voucher" },

    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Order", orderModel);
