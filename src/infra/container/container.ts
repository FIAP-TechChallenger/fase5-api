// Repositórios
import { FirebaseAuthRepository } from "../repositories/outros/FirebaseAuthRepository";
import { FirebaseUsuarioRepository } from "../repositories/outros/FirebaseUsuarioRepository";
import { FirebaseNotificacaoRepository } from "../repositories/outros/FirebaseNotificacaoRepository";
import { FirebaseMetaRepository } from "../repositories/comercial/FirebaseMetaRepository";
import { FirebaseDashboardProducaoRepository } from "../repositories/outros/FirebaseDashboardProducaoRepository";
import { FirebaseDashboardComercialRepository } from "../repositories/outros/FirebaseDashboardComercialRepository";
import { FirebaseInsumoRepository } from "../repositories/producao/firebaseInsumoRepository";
import { FirebaseMedidaRepository } from "../repositories/producao/firebaseMedidaRepository";
import { FirebaseEstoqueInsumoRepository } from "../repositories/producao/firebaseEstoqueInsumoRepository";
import { FirebaseProducaoRepository } from "../repositories/producao/firebaseProducaoRepository";
import { FirebaseFazendaRepository } from "../repositories/producao/firebaseFazendaRepository";
import { FirebaseProdutoRepository } from "../repositories/producao/firebaseProdutoRepository";
import { FirebaseEstoqueProdutoRepository } from "../repositories/producao/firebaseEstoqueProdutoRepository";

// Services
import { AuthCookieService } from "@/application/services/outros/AuthCookieService";
import { AuthService } from "@/application/services/outros/AuthService";
import { NotificacaoService } from "@/application/services/outros/notificacao/NotificacaoService";
import { UsuarioCadastroService } from "@/application/services/outros/UsuarioCadastroService";
import { UsuarioConsultaService } from "@/application/services/outros/UsuarioConsultaService";
import { MetaService } from "@/application/services/comercial/MetaService";
import { DashboardProducaoService } from "@/application/services/outros/dashboard/DashboardProducaoService";
import { DashboardComercialService } from "@/application/services/outros/dashboard/DashboardComercialService";
import { InsumoService } from "@/application/services/producao/InsumoService";
import { EstoqueInsumoService } from "@/application/services/producao/EstoqueInsumoService";
import { ProducaoService } from "@/application/services/producao/ProducaoService";
import { NodeMailerEmailService } from "../email/NodeMailerEmailService";
import { MetaAtualizarValorPorTipoService } from "@/application/services/comercial/MetaAtualizarValorPorTipoService";
import { FirebaseVendaRepository } from "../repositories/comercial/FirebaseVendaRepository";
import { EstoqueProdutoService } from "@/application/services/producao/EstoqueProdutoService";
import { VendaService } from "@/application/services/comercial/VendaService";

// === Instância de Repositórios ===
const authRepository = new FirebaseAuthRepository();
const usuarioRepository = new FirebaseUsuarioRepository();
const notificacaoRepository = new FirebaseNotificacaoRepository();
const metaRepository = new FirebaseMetaRepository();
const dashboardProducaoRepository = new FirebaseDashboardProducaoRepository();
const dashboardComercialRepository = new FirebaseDashboardComercialRepository();

const insumoRepository = new FirebaseInsumoRepository();
const medidaRepository = new FirebaseMedidaRepository();
const estoqueInsumoRepository = new FirebaseEstoqueInsumoRepository();

const producaoRepository = new FirebaseProducaoRepository();
const fazendaRepository = new FirebaseFazendaRepository();
const produtoRepository = new FirebaseProdutoRepository();
const estoqueProdutoRepository = new FirebaseEstoqueProdutoRepository();
const vendaRepository = new FirebaseVendaRepository();

// === Instância de Services ===
const emailService = new NodeMailerEmailService();
const authCookieService = new AuthCookieService();
const authService = new AuthService(authRepository, usuarioRepository);
const notificacaoService = new NotificacaoService(notificacaoRepository);
const usuarioCadastroService = new UsuarioCadastroService(
  emailService,
  usuarioRepository
);
const usuarioConsultaService = new UsuarioConsultaService(usuarioRepository);
const estoqueProdutoService = new EstoqueProdutoService(
  estoqueProdutoRepository,
  produtoRepository,
  medidaRepository
);

const metaService = new MetaService(metaRepository);
const metaAtualizarValorPorTipoService = new MetaAtualizarValorPorTipoService(
  metaRepository
);

const dashboardProducaoService = new DashboardProducaoService(
  dashboardProducaoRepository
);
const dashboardComercialService = new DashboardComercialService(
  dashboardComercialRepository,
  produtoRepository
);

const insumoService = new InsumoService(insumoRepository, medidaRepository);
const estoqueInsumoService = new EstoqueInsumoService(
  estoqueInsumoRepository,
  insumoRepository,
  medidaRepository
);
const producaoService = new ProducaoService(
  producaoRepository,
  fazendaRepository,
  produtoRepository,
  estoqueProdutoRepository,
  metaAtualizarValorPorTipoService,
  dashboardProducaoService,
  estoqueInsumoService
);

const vendaService = new VendaService(
  vendaRepository,
  produtoRepository,
  dashboardComercialService,
  estoqueProdutoService,
  metaAtualizarValorPorTipoService
);

// === Exportando o container ===
export const container = {
  // Repositórios
  authRepository,
  usuarioRepository,
  notificacaoRepository,
  metaRepository,
  vendaRepository,

  // Services
  emailService,
  authCookieService,
  authService,
  notificacaoService,
  usuarioCadastroService,
  usuarioConsultaService,
  metaService,
  metaAtualizarValorPorTipoService,
  dashboardProducaoService,
  dashboardComercialService,
  insumoService,
  estoqueInsumoService,
  producaoService,
  vendaService,
  estoqueProdutoService,
};
