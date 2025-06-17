import { Router } from "express";
import {
  createProductSize,
  deleteProductSize,
  getDetailProductSize,
  getProductSize,
  updateProductSize,
} from "./size.controller.js";

const productSizeRoutes = Router();

productSizeRoutes.get("/", getProductSize);
productSizeRoutes.post("/", createProductSize);
productSizeRoutes.get("/:id", getDetailProductSize);
productSizeRoutes.patch("/:id", updateProductSize);
productSizeRoutes.delete("/:id", deleteProductSize);

export default productSizeRoutes;
