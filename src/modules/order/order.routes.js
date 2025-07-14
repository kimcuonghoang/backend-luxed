import { Router } from "express";
import {
  createOrder,
  createPayosPayment,
  getListOrderByAdmin,
  getListOrderOwner,
} from "./order.controller.js";

const orderRoutes = Router();

orderRoutes.get("/", getListOrderByAdmin);
orderRoutes.get("/:userId", getListOrderOwner);
orderRoutes.post("/", createOrder);
orderRoutes.post("/createPayment", createPayosPayment);

export default orderRoutes;
