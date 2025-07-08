import mongoose, { Schema } from "mongoose";
import { USER_ROLES } from "../../common/constants/enums.js";

const userModel = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    bio: { type: String },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "member",
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    },

    social: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      youtube: { type: String },
      tiktok: { type: String },
    },

    phoneNumber: { type: String },
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
