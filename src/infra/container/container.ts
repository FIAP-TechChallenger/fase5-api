import { AuthCookieService } from "@/application/services/outros/AuthCookieService";
import { AuthService } from "@/application/services/outros/AuthService";
import { FirebaseUsuarioRepository } from "../repositories/outros/FirebaseUsuarioRepository";
import { FirebaseAuthRepository } from "../repositories/outros/FirebaseAuthRepository";
import { FirebaseNotificacaoRepository } from "../repositories/outros/FirebaseNotificacaoRepository";
import { NotificacaoService } from "@/application/services/outros/NotificacaoService";
import { UsuarioCadastroService } from "@/application/services/outros/UsuarioCadastroService";
import { UsuarioConsultaService } from "@/application/services/outros/UsuarioConsultaService";
import { NodeMailerEmailService } from "../email/NodeMailerEmailService";
import { MetaService } from "@/application/services/comercial/MetaService";
import { FirebaseMetaRepository } from "../repositories/comercial/FirebaseMetaRepository";
import { MetaAtualizarValorTipoProducaoService } from "@/application/services/comercial/MetaAtualizarValorTipoProducaoService";
import { ProducaoService } from "@/application/services/producao/ProducaoService";
import { FirebaseProducaoRepository } from "../repositories/producao/firebaseProducaoRepository";
import { FirebaseFazendaRepository } from "../repositories/producao/firebaseFazendaRepository";
import { FirebaseProdutoRepository } from "../repositories/producao/firebaseProdutoRepository";
import { FirebaseEstoqueProdutoRepository } from "../repositories/producao/firebaseEstoqueProdutoRepository";
import { FirebaseInsumoRepository } from "../repositories/producao/firebaseInsumoRepository";
import { InsumoService } from "@/application/services/producao/InsumoService";
import { FirebaseMedidaRepository } from "../repositories/producao/firebaseMedidaRepository";

const authRepository = new FirebaseAuthRepository();
const usuarioRepository = new FirebaseUsuarioRepository();
const notificacaoRepository = new FirebaseNotificacaoRepository();
const metaRepository = new FirebaseMetaRepository();
const insumoRepository = new FirebaseInsumoRepository();
const medidaRepository = new FirebaseMedidaRepository();
const insumoService = new InsumoService(insumoRepository, medidaRepository);


const producaoRepository = new FirebaseProducaoRepository();
const fazendaRepository = new FirebaseFazendaRepository();
const produtoRepository = new FirebaseProdutoRepository();
const estoqueProdutoRepository = new FirebaseEstoqueProdutoRepository();

// service
const emailService = new NodeMailerEmailService();
const authCookieService = new AuthCookieService();
const authService = new AuthService(authRepository, usuarioRepository);
const notificacaoService = new NotificacaoService(notificacaoRepository);
const usuarioCadastroService = new UsuarioCadastroService(
  emailService,
  usuarioRepository
);
const usuarioConsultaService = new UsuarioConsultaService(usuarioRepository);
const metaService = new MetaService(metaRepository);

const metaAtualizarValorTipoProducaoService =
  new MetaAtualizarValorTipoProducaoService(metaRepository);

const producaoService = new ProducaoService(
  producaoRepository,
  fazendaRepository,
  produtoRepository,
  estoqueProdutoRepository,
  metaAtualizarValorTipoProducaoService,
  
);

export const container = {
  authRepository,
  usuarioRepository,
  notificacaoRepository,
  metaRepository,
  // service
  emailService,
  authCookieService,
  authService,
  notificacaoService,
  usuarioCadastroService,
  usuarioConsultaService,
  metaService,
  metaAtualizarValorTipoProducaoService,
  producaoService,
};
