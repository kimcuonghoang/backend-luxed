import mongoose from "mongoose";

const productColorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  hexCode: { type: String },
});

export default mongoose.model("ProductColor", productColorSchema);
