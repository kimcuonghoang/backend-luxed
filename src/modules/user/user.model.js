import mongoose, { Schema } from "mongoose";
import { USER_ROLES } from "../../common/constants/enums";

const userModel = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    bio: { type: String },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "member",
      required: true,
    },
    phone_number: { type: String, required: true },
    isActive: { type: Boolean },
    latestLogin: { type: Date },
    isVerifyEmail: { type: Boolean },
    isVerifyPhoneNumber: { type: Boolean },
    is2StepVerify: { type: Boolean },

    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userModel);
