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
router.use("/usuario",  UsuarioController.routes());
router.use("/meta",  MetaController.routes());
router.use("/dashboard",  DashboardController.routes());
router.use("/notificacao",  NotificacaoController.routes());
router.use("/fazenda", FazendaController.routes());
router.use("/produto",  ProdutoController.routes());
router.use("/insumo",  InsumoController.routes());
router.use("/producao",  ProducaoController.routes());
router.use("/unidadeMedida",  UnidadeMedidaController.routes());
router.use("/estoqueProduto",  EstqueProdutoController.routes());
router.use("/estoqueInsumo",  EstoqueInsumoController.routes());
router.use("/colheita",  ColheitaController.routes());
router.use("/venda",  VendaController.routes());

export default router;
