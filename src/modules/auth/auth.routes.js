import { Router } from "express";
import { authLogout, getUser, Login, Register } from "./auth.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

import { authenticate } from "../../common/middlewares/auth.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), Register);

authRoutes.post("/login", validBodyRequest(loginSchema), Login);
authRoutes.post("/logout", authenticate, authLogout);

authRoutes.get("/users", authenticate, getUser);

export default authRoutes;
