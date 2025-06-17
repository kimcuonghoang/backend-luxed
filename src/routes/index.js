import { Router } from "express";
import categoryRoutes from "../modules/category/category.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import productRoutes from "./../modules/product/product.routes.js";
import brandRoutes from "../modules/brand/brand.routes.js";
import variantRoutes from "../modules/variant/variant.routes.js";
import productColorRoutes from "../modules/color/color.routes.js";
import productSizeRoutes from "../modules/size/size.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/sub-categories", subCategoryRoutes);
router.use("/auth", authRoutes);
router.use("/brands", brandRoutes);
router.use("/variants", variantRoutes);
router.use("/colors", productColorRoutes);
router.use("/sizes", productSizeRoutes);

export default router;
