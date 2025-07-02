import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";
import { NotificacaoFirebase } from "@/infra/firebase/models/outros/NotificacaoFirebase";
import { Notificacao } from "@/domain/entities/outros/Notificacao";

export class NotificacaoConverter {
  static toFirestore(dados: Notificacao): NotificacaoFirebase {
    return {
      tipo: dados.tipo,
      titulo: dados.titulo,
      descricao: dados.descricao,
      lida: dados.lida,
      dataEnvio: getFirebaseTimeStamp(dados.dataEnvio),
    };
  }

  static fromFirestore(data: NotificacaoFirebase, id: string): Notificacao {
    return new Notificacao({
      id,
      tipo: data.tipo,
      titulo: data.titulo,
      descricao: data.descricao,
      lida: data.lida,
      dataEnvio: data.dataEnvio.toDate(),
    });
  }
}
