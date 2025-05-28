import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middlewares/auth";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();

router.use("/auth", AuthController.routes());
router.use("/user", authenticate, UsuarioController.routes());

export default router;
