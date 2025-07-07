import { Router } from "express";
import {
  createOrder,
  getListOrderByAdmin,
  getListOrderOwner,
} from "./order.controller.js";

const orderRoutes = Router();

orderRoutes.get("/", getListOrderByAdmin);
orderRoutes.get("/:userId", getListOrderOwner);
orderRoutes.post("/", createOrder);

export default orderRoutes;
