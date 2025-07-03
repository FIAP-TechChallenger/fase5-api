import { NotificacaoBuscarTodasDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasDTO";
import { NotificacaoBuscarTodasResponseDTO } from "@/application/dtos/outros/NotificacaoBuscarTodasResponseDTO";
import { Notificacao } from "@/domain/entities/outros/Notificacao";
import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";

export interface INotificacaoRepository {
  buscarPorTipos(
    tipos: NotificacaoTipoEnum[],
    dto: NotificacaoBuscarTodasDTO
  ): Promise<NotificacaoBuscarTodasResponseDTO>;
  inserir(dados: Notificacao): Promise<void>;
  marcarTodasComoLidas(userId: string): Promise<void>;
  buscarQtdNaoLidas(userId: string): Promise<number>;
}
