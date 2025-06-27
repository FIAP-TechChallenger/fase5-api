import { MetaFirebase } from "@/infra/firebase/models/comercial/MetaFirebase";
import { Meta } from "@/domain/entities/comercial/Meta";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";

export class MetaConverter {
  static toFirestore(meta: Meta): MetaFirebase {
    return {
      usuarioId: meta.usuarioId,
      tipo: meta.tipo,
      titulo: meta.titulo,
      calculoPor: meta.calculoPor,
      status: meta.status,
      descricao: meta.descricao,
      valorAlvo: meta.valorAlvo,
      valorAtual: meta.valorAtual,
      fazendaId: meta.fazendaId,
      dataInicio: getFirebaseTimeStamp(meta.dataInicio),
      dataFim: getFirebaseTimeStamp(meta.dataFim),
      atualizadaEm: getFirebaseTimeStamp(meta.atualizadaEm),
      criadaEm: getFirebaseTimeStamp(meta.criadaEm),
    };
  }

  static fromFirestore(data: MetaFirebase, id: string): Meta {
    return new Meta({
      id,
      usuarioId: data.usuarioId,
      tipo: data.tipo,
      titulo: data.titulo,
      calculoPor: data.calculoPor,
      status: data.status,
      descricao: data.descricao,
      valorAlvo: data.valorAlvo,
      valorAtual: data.valorAtual,
      fazendaId: data.fazendaId,
      dataInicio: data.dataInicio.toDate(),
      dataFim: data.dataFim.toDate(),
      atualizadaEm: data.atualizadaEm.toDate(),
      criadaEm: data.criadaEm.toDate(),
    });
  }
}
