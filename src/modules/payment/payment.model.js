import { Schema } from "mongoose";
import { PAYMENT_STATUS } from "../../common/constants/paymentStatus";

const paymentModel = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    paymentMethod: { type: String },
    status: { type: String, enum: PAYMENT_STATUS, default: "pending" },
    transactionId: { type: String },
    paidAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Payment", paymentModel);
