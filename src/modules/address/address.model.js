import mongoose, { Schema } from "mongoose";

const addressModel = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    isDefault: { type: Boolean },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Address", addressModel);
