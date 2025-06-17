import { Router } from "express";
import {
  createProductColor,
  deleteProductColor,
  getDetailProductColor,
  getProductColor,
  updateProductColor,
} from "./color.controller.js";

const productColorRoutes = Router();

productColorRoutes.get("/", getProductColor);
productColorRoutes.post("/", createProductColor);
productColorRoutes.get("/:id", getDetailProductColor);
productColorRoutes.patch("/:id", updateProductColor);
productColorRoutes.delete("/:id", deleteProductColor);

export default productColorRoutes;
