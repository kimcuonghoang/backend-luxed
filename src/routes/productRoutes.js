import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getDetailProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/", getProduct);
productRoutes.post("/", createProduct);
productRoutes.get("/:id", getDetailProduct);
productRoutes.patch("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
