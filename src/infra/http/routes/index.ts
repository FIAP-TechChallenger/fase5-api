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
import { DashboardController } from "../controllers/outros/DashboardController";
import { ColheitaController } from "../controllers/producao/ColheitaController";
import { VendaController } from "../controllers/comercial/VendaController";

const router = Router();

router.use("/auth", AuthController.routes());
router.use("/usuario", authenticate, UsuarioController.routes());
router.use("/meta", authenticate, MetaController.routes());
router.use("/dashboard", authenticate, DashboardController.routes());
router.use("/notificacao", authenticate, NotificacaoController.routes());
router.use("/fazenda", authenticate, FazendaController.routes());
router.use("/produto", authenticate, ProdutoController.routes());
router.use("/insumo", authenticate, InsumoController.routes());
router.use("/producao", authenticate, ProducaoController.routes());
router.use("/unidadeMedida", authenticate, UnidadeMedidaController.routes());
router.use("/estoqueProduto", authenticate, EstqueProdutoController.routes());
router.use("/estoqueInsumo", authenticate, EstoqueInsumoController.routes());
router.use("/colheita", authenticate, ColheitaController.routes());
router.use("/venda",  VendaController.routes());

export default router;
