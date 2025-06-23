import mongoose from "mongoose";

const attributeModel = new mongoose.Schema(
  {
    attributeName: { type: String, required: true },
    attributeCode: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    deletedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Attribute", attributeModel);
