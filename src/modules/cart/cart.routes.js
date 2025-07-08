import { Router } from "express";
import { getCart, deleteCart, updateCart } from "./cart.controller.js";
import { verifyUser } from "../../common/middlewares/verifyUser.js";

const cartRouter = Router();

cartRouter.get("/", getCart);
cartRouter.put("/:id", updateCart);
cartRouter.delete("/:id", deleteCart);

export default cartRouter;
