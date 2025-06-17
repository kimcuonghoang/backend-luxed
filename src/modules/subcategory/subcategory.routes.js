import { Router } from "express";

import {
  createSubCategory,
  deleteSubCategory,
  getSubCategory,
  getDetailSubCategory,
  softDeleteSubCategory,
  updateSubCategory,
  restoreSubCategory,
} from "./subcategory.controller.js";

const subCategoryRoutes = Router();

subCategoryRoutes.post("/", createSubCategory);
subCategoryRoutes.get("/", getSubCategory);
subCategoryRoutes.get("/:id", getDetailSubCategory);
subCategoryRoutes.patch("/:id", updateSubCategory);
subCategoryRoutes.delete("/:id", deleteSubCategory);
subCategoryRoutes.delete("/soft-delete/:id", softDeleteSubCategory);
subCategoryRoutes.patch("/restore/:id", restoreSubCategory);

export default subCategoryRoutes;
