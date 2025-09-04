import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getDetailProduct,
  getProduct,
  updateProduct,
  // Variant controllers
  addProductVariant,
  getProductVariants,
  updateProductVariant,
  deleteProductVariant,
  getProductVariantDetail, // thêm controller mới
} from "./product.controller.js";
import validBodyRequest from "./../../common/middlewares/validBodyRequest.js";
import productSchema from "./product.schema.js";

const productRoutes = Router();

productRoutes.get("/", getProduct);
productRoutes.post("/", validBodyRequest(productSchema), createProduct);
productRoutes.get("/:id", getDetailProduct);
productRoutes.patch("/:id", validBodyRequest(productSchema), updateProduct);
productRoutes.delete("/:id", deleteProduct);

// Variant routes
productRoutes.post("/:id/variant", addProductVariant);
productRoutes.get("/:id/variants", getProductVariants);
productRoutes.patch("/:id/variant/:variantId", updateProductVariant);
productRoutes.delete("/:id/variant/:variantId", deleteProductVariant);
productRoutes.get("/:id/variant/:variantId", getProductVariantDetail);

export default productRoutes;
