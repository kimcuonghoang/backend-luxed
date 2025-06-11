import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategory,
  getDetailCategory,
  softDeleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRoutes = Router();

categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getCategory);
categoryRoutes.get("/:id", getDetailCategory);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);
categoryRoutes.delete("/soft-delete/:id", softDeleteCategory);

export default categoryRoutes;
