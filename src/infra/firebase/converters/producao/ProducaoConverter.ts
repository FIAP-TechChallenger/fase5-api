import { Timestamp } from "firebase-admin/firestore";
import { Producao } from "@/domain/entities/producao/Producao";
import { ProducaoFirebase } from "../../models/producao/ProducaoFirebase";

export class ProducaoConverter {
  static toFirestore(producao: Producao): ProducaoFirebase {
    return {
      quantidadePlanejada: producao.quantidadePlanejada,
      precoPlanejado: producao.precoPlanejado,
      status: producao.status,
      produtoId: producao.produtoId,
      fazendaId: producao.fazendaId,
      lote: producao.lote,
      insumos: producao.insumos.map(i => ({
        insumoId: i.insumoId,
        quantidade: i.quantidade
      })),
      colheitaId: producao.colheitaId,
      criadaEm: this._toTimestamp(producao.criadaEm)!,
      atualizadaEm: this._toTimestamp(producao.atualizadaEm)!,
      dataInicio: this._toTimestamp(producao.dataInicio)!,
      dataFim: this._toTimestamp(producao.dataFim)!,
    };
  }

  static fromFirestore(data: ProducaoFirebase, id: string): Producao {
    return new Producao({
      id,
      quantidadePlanejada: data.quantidadePlanejada,
      precoPlanejado: data.precoPlanejado,
      status: data.status,
      produtoId: data.produtoId,
      fazendaId: data.fazendaId,
      lote: data.lote,
      insumos: data.insumos.map(i => ({
        insumoId: i.insumoId,
        quantidade: i.quantidade,
      })),
      colheitaId: data.colheitaId,
      criadaEm: data.criadaEm.toDate(),
      atualizadaEm: data.atualizadaEm.toDate(),
      dataInicio: data.dataInicio.toDate(),
      dataFim: data.dataFim.toDate(),
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}