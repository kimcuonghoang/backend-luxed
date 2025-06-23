import { Router } from "express";
import {
  createAttribute,
  deleteAttribute,
  getAttributeById,
  getAllAttribute,
  updateAttribute,
  softDeleteAttribute,
  restoreAttribute,
} from "./attribute.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import { attributeSchema } from "./attribute.schema.js";

const attributeRoutes = Router();

attributeRoutes.get("/", getAllAttribute);
attributeRoutes.get("/:id", getAttributeById);

// * Role Admin

attributeRoutes.delete("/:id", deleteAttribute);
attributeRoutes.patch("/soft-delete/:id", softDeleteAttribute);
attributeRoutes.patch("/restore/:id", restoreAttribute);

attributeRoutes.use(validBodyRequest(attributeSchema));
attributeRoutes.post("/", createAttribute);
attributeRoutes.patch("/:id", updateAttribute);

export default attributeRoutes;
