import { Router } from "express";
import categoryRoutes from "../modules/category/category.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import productRoutes from "../modules/product/product.routes.js";
import brandRoutes from "../modules/brand/brand.routes.js";
import variantRoutes from "../modules/variant/variant.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";
import attributeRoutes from "../modules/attribute/attribute.routes.js";
import attributeValueRoutes from "../modules/attribute-value/attribute-value.routes.js";
import orderRoutes from "../modules/order/order.routes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/sub-categories", subCategoryRoutes);
router.use("/auth", authRoutes);
router.use("/brands", brandRoutes);
router.use("/variants", variantRoutes);
router.use("/attribute", attributeRoutes);
router.use("/attribute-value", attributeValueRoutes);
router.use("/order", orderRoutes);

export default router;
