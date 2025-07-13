import { Notificacao } from "@/domain/entities/outros/Notificacao";

export interface NotificacaoBuscarTodasResponseDTO {
  dados: Notificacao[];
  ultimoId: string | null;
  temMais: boolean;
}
