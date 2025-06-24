import { Timestamp } from "firebase-admin/firestore";
import { MetaFirebase } from "@/infra/firebase/models/comercial/MetaFirebase";
import { Meta } from "@/domain/entities/comercial/Meta";

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
      vendaId: meta.vendaId,
      producaoId: meta.producaoId,
      fazendaId: meta.fazendaId,
      dataInicio: this._toTimeStamp(meta.dataInicio),
      dataFim: this._toTimeStamp(meta.dataFim),
      atualizadaEm: this._toTimeStamp(meta.atualizadaEm),
      criadaEm: this._toTimeStamp(meta.criadaEm),
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
      vendaId: data.vendaId,
      producaoId: data.producaoId,
      fazendaId: data.fazendaId,
      dataInicio: data.dataInicio.toDate(),
      dataFim: data.dataFim.toDate(),
      atualizadaEm: data.atualizadaEm.toDate(),
      criadaEm: data.criadaEm.toDate(),
    });
  }

  private static _toTimeStamp(date: Date) {
    return Timestamp.fromDate(date instanceof Date ? date : new Date(date));
  }
}
