import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";

export interface NotificacaoEnviarDTO {
  titulo: string;
  descricao: string;
  tipo: NotificacaoTipoEnum;
}
