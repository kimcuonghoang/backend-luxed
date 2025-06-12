import mongoose, { Schema } from "mongoose";

const productSizeSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("ProductSize", productSizeSchema);
