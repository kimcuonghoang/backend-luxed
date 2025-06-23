import { Router } from "express";
import {
  createAttributeValue,
  deleteAttributeValue,
  getAttributeValueById,
  getAttributeValue,
  updateAttributeValue,
  softDeleteAttributeValue,
  restoreAttributeValue,
} from "./attribute-value.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import { attributeValueSchema } from "./attribute-value.schema.js";

const attributeValueRoutes = Router();

attributeValueRoutes.get("/productId/:productId", getAttributeValue);
attributeValueRoutes.get("/:id", getAttributeValueById);

// * Role Admin

attributeValueRoutes.delete("/:id", deleteAttributeValue);
attributeValueRoutes.patch("/soft-delete/:id", softDeleteAttributeValue);
attributeValueRoutes.patch("/restore/:id", restoreAttributeValue);

attributeValueRoutes.use(validBodyRequest(attributeValueSchema));
attributeValueRoutes.post("/", createAttributeValue);
attributeValueRoutes.patch("/:id", updateAttributeValue);

export default attributeValueRoutes;
