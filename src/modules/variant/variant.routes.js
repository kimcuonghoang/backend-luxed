import { Router } from "express";
import {
  createVariant,
  deleteVariant,
  getDetailVariant,
  getVariant,
  updateVariant,
} from "./variant.controller.js";

const variantRoutes = Router();

variantRoutes.get("/", getVariant);
variantRoutes.post("/", createVariant);
variantRoutes.get("/:id", getDetailVariant);
variantRoutes.patch("/:id", updateVariant);
variantRoutes.delete("/:id", deleteVariant);

export default variantRoutes;
