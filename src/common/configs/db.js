import mongoose from "mongoose";
import { DB_URI, NROK_AUTH_tOKEN, PORT } from "./enviroments.js";
import ngrok from "@ngrok/ngrok";
import { confirmWebhookPayment } from "../../modules/order/order.controller.js";
async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    const listener = await ngrok.connect({
      addr: PORT,
      authtoken: NROK_AUTH_tOKEN,
    });
    const urlNgrokWebhook = `${listener.url()}/webhook`;
    confirmWebhookPayment(urlNgrokWebhook);
    console.log("Ngrok URL for webhook:", urlNgrokWebhook);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error :", error);
  }
}

export default connectDB;
