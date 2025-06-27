import { Router } from "express";
import {
  createVariant,
  deleteVariant,
  getDetailVariant,
  getVariant,
  updateVariant,
} from "./variant.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import variantSchema from "./variant.schema.js";

const variantRoutes = Router();

variantRoutes.get("/", getVariant);
variantRoutes.post("/", validBodyRequest(variantSchema), createVariant);
variantRoutes.get("/:id", getDetailVariant);
variantRoutes.patch("/:id", validBodyRequest(variantSchema), updateVariant);
variantRoutes.delete("/:id", deleteVariant);

export default variantRoutes;
