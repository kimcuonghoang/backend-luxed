import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getDetailProduct,
  getProduct,
  updateProduct,
} from "./product.controller.js";
import validBodyRequest from "./../../common/middlewares/validBodyRequest.js";
import productSchema from "./product.schema.js";

const productRoutes = Router();

productRoutes.get("/", getProduct);
productRoutes.post("/", validBodyRequest(productSchema), createProduct);
productRoutes.get("/:id", getDetailProduct);
productRoutes.patch("/:id", validBodyRequest(productSchema), updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
