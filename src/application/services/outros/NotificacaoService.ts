import { INotificacaoRepository } from "@/domain/repositories/outros/INotificacaoRepository";
import { Usuario } from "@/domain/entities/outros/Usuario";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";
import { UsuarioSetorEnum } from "@/domain/types/usuario.enum";
import { NotificacaoBuscarTodasDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasDTO";
import { NotificacaoBuscarTodasResponseDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasResponseDTO";

export class NotificacaoService {
  constructor(private authRepo: INotificacaoRepository) {}

  async buscarTodas(
    usuario: Usuario,
    dto: NotificacaoBuscarTodasDTO
  ): Promise<NotificacaoBuscarTodasResponseDTO> {
    let tipos: NotificacaoTipoEnum[] = [];

    switch (usuario.setor) {
      case UsuarioSetorEnum.ADMIN:
      case UsuarioSetorEnum.COMERCIAL:
        tipos.push(NotificacaoTipoEnum.META_CONCLUIDA);
        break;
    }

    return this.authRepo.buscarPorTipos(tipos, dto);
  }

  async marcarTodasComoLidas(userId: string): Promise<void> {
    this.authRepo.marcarTodasComoLidas(userId);
  }

  async buscarQtdNaoLidas(userId: string): Promise<number> {
    return this.authRepo.buscarQtdNaoLidas(userId);
  }
}
