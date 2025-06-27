import { Router } from "express";
import {
  createProductSize,
  deleteProductSize,
  getDetailProductSize,
  getProductSize,
  updateProductSize,
} from "./size.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import sizeSchema from "./size.schema.js";

const productSizeRoutes = Router();

productSizeRoutes.get("/", getProductSize);
productSizeRoutes.post("/", validBodyRequest(sizeSchema), createProductSize);
productSizeRoutes.get("/:id", getDetailProductSize);
productSizeRoutes.patch(
  "/:id",
  validBodyRequest(sizeSchema),
  updateProductSize
);
productSizeRoutes.delete("/:id", deleteProductSize);

export default productSizeRoutes;
