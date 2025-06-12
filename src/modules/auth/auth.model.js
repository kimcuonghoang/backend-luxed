import mongoose from "mongoose";
const authSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    // role: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", authSchema);
