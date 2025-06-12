import mongoose, { Schema } from "mongoose";

const voucherModel = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    descountAmount: { type: String },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Voucher", voucherModel);
