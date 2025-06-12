import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getDetailBrand,
  getBrand,
  updateBrand,
  restoreBrand,
} from "./brand.controller.js";

const brandRoutes = Router();

brandRoutes.get("/", getBrand);
brandRoutes.get("/:id", getDetailBrand);

brandRoutes.post("/", createBrand);

brandRoutes.patch("/restore/:id", restoreBrand);
brandRoutes.patch("/:id", updateBrand);

brandRoutes.delete("/:id", deleteBrand);

export default brandRoutes;
