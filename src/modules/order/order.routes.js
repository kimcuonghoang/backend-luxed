import { Router } from "express";
import {
  createOrder,
  createPayOsPayment,
  getListOrderByAdmin,
  getListOrderOwner,
} from "./order.controller.js";

const orderRoutes = Router();

orderRoutes.get("/", getListOrderByAdmin);

orderRoutes.post("/createPayment", createPayOsPayment);

orderRoutes.post("/", createOrder);

orderRoutes.get("/:userId", getListOrderOwner);
export default orderRoutes;
