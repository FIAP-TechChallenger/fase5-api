import { Router } from "express";
import { login, logout } from "../controllers/authController";
import { authenticate } from "../middlewares/auth";
import { register } from "../controllers/userController";

const router = Router();

router.post("/auth/login", login);
router.post("/auth/logout", authenticate, logout);
router.post("/user/register", authenticate, register);

export default router;
