import { Router } from "express";
import categoryRoutes from "../modules/category/category.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import productRoutes from "./../modules/product/product.routes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/auth", authRoutes);

export default router;
