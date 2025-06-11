import { Router } from "express";
import { getUser, Login, Register } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/register", Register);

authRoutes.post("/login", Login);

authRoutes.get("/users", getUser);

export default authRoutes;
