import { Notificacao } from "@/domain/entities/outros/Notificacao";

export interface INotificacaoRepository {
  buscarTodos(): Promise<Notificacao[]>;
  inserir(dados: Notificacao): Promise<void>;
  marcarComoLida(id: string, userId: string): Promise<void>;
}
