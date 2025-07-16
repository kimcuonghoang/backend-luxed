import { Router } from "express";
import { authLogout, getUser, Login, Register } from "./auth.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

import { permission } from "../../common/middlewares/permission.js";
import { authenticate } from "../../common/middlewares/auth.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), Register);

authRoutes.post("/login", validBodyRequest(loginSchema), Login);
authRoutes.post("/logout", authenticate, authLogout);

// ✅ Chỉ những người có quyền "view_users" mới được gọi API này
authRoutes.get("/users", authenticate, permission("view_users"), getUser);

export default authRoutes;
