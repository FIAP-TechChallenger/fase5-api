import { Timestamp } from "firebase-admin/firestore";
import { Insumo } from "@/domain/entities/producao/Insumo";
import { InsumoFirebase } from "../../models/producao/InsumoFirebase";

export class InsumoConverter {
  static toFirestore(insumo: Insumo): InsumoFirebase {
    return {
      nome: insumo.nome,
      unidadeMedidaId:insumo.unidadeMedidaId,
      criadaEm: this._toTimestamp(insumo.criadaEm), 
     
    };
  }

  static fromFirestore(data: InsumoFirebase, id: string): Insumo {
    return new Insumo({
      id,
      nome: data.nome,
      unidadeMedidaId: data.unidadeMedidaId,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}