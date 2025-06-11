import { Router } from "express";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import authRoutes from "./auth.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/auth", authRoutes);

export default router;
