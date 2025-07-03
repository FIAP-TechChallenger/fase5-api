import { Router } from "express";
import { AuthController } from "../controllers/outros/AuthController";
import { authenticate } from "../middlewares/auth";
import { UsuarioController } from "../controllers/outros/UsuarioController";
import { MetaController } from "../controllers/comercial/MetaController";
import { FazendaController } from "../controllers/producao/FazendaController";
import { ProdutoController } from "../controllers/producao/ProdutoController";
import { ProducaoController } from "../controllers/producao/ProducaoController";
import { UnidadeMedidaController } from "../controllers/producao/UnidadeMedidaController";
import { EstoqueInsumoController } from "../controllers/producao/EstoqueInsumoController";
import { EstqueProdutoController } from "../controllers/producao/EstoqueProdutoController";
import { InsumoController } from "../controllers/producao/InsumoController";
import { NotificacaoController } from "../controllers/outros/NotificacaoController";

const router = Router();

router.use("/auth", AuthController.routes());
router.use("/user", authenticate, UsuarioController.routes());
router.use("/meta",authenticate, MetaController.routes());
router.use("/notificacao", authenticate, NotificacaoController.routes());
router.use("/fazenda", FazendaController.routes());
router.use("/produto", ProdutoController.routes());
router.use("/insumo", InsumoController.routes());
router.use("/producao", ProducaoController.routes());
router.use("/unidadeMedida", UnidadeMedidaController.routes());
router.use("/estoqueProduto", EstqueProdutoController.routes());
router.use("/estoqueInsumo", EstoqueInsumoController.routes());

export default router;
