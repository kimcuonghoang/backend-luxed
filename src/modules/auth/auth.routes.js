import { Router } from "express";
import { getUser, Login, Register } from "./auth.controller.js";
import validBodyRequest from "./../../common/middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), Register);

authRoutes.post("/login", validBodyRequest(loginSchema), Login);

authRoutes.get("/users", getUser);

export default authRoutes;
