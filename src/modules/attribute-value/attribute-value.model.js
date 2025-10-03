import mongoose, { Schema } from "mongoose";

const attributeValueModel = mongoose.Schema(
  {
    value: { type: String, required: true },
    valueCode: { type: String, required: true, unique: true },
    attributeId: {
      type: Schema.Types.ObjectId,
      ref: "Attribute",
    },
    isActive: { type: Boolean },
    deletedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
attributeValueModel.index({ attributeId: 1, valueCode: 1 }, { unique: true });

export default mongoose.model("AttributeValue", attributeValueModel);
