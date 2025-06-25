import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middlewares/auth";
import { UsuarioController } from "../controllers/UsuarioController";
import { MetaController } from "../controllers/comercial/MetaController";
import { FazendaController } from "../controllers/producao/FazendaController";

const router = Router();

router.use("/auth", AuthController.routes());
router.use("/user", authenticate, UsuarioController.routes());
router.use("/meta", authenticate, MetaController.routes());
router.use("/fazenda", authenticate, FazendaController.routes());

export default router;
