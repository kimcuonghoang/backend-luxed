import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategory,
  getDetailCategory,
  softDeleteCategory,
  updateCategory,
} from "./category.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import categorySchema from "./category.schema.js";

const categoryRoutes = Router();

categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory);
categoryRoutes.get("/", getCategory);
categoryRoutes.get("/:id", getDetailCategory);
categoryRoutes.patch("/:id", validBodyRequest(categorySchema), updateCategory);
categoryRoutes.delete("/:id", deleteCategory);
categoryRoutes.delete("/soft-delete/:id", softDeleteCategory);

export default categoryRoutes;
