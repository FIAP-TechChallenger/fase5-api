import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";

export class Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  dataEnvio: Date;
  lida: boolean;
  tipo: NotificacaoTipoEnum;

  constructor(obj: Notificacao) {
    this.id = obj.id;
    this.titulo = obj.titulo;
    this.descricao = obj.descricao;
    this.dataEnvio = obj.dataEnvio;
    this.lida = obj.lida;
    this.tipo = obj.tipo;
  }
}
