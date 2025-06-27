import { Router } from "express";
import {
  createProductColor,
  deleteProductColor,
  getDetailProductColor,
  getProductColor,
  updateProductColor,
} from "./color.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import colorSchema from "./color.schema.js";

const productColorRoutes = Router();

productColorRoutes.get("/", getProductColor);
productColorRoutes.post("/", validBodyRequest(colorSchema), createProductColor);
productColorRoutes.get("/:id", getDetailProductColor);
productColorRoutes.patch(
  "/:id",
  validBodyRequest(colorSchema),
  updateProductColor
);
productColorRoutes.delete("/:id", deleteProductColor);

export default productColorRoutes;
