import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
import { Timestamp } from "firebase-admin/firestore";
import { EstoqueInsumoFirebase } from "../../models/producao/EstoqueInsumoFirebase";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";

export class EstoqueInsumoConverter {
  static toFirestore(estoqueInsumo: EstoqueInsumo): EstoqueInsumoFirebase {
    return {
        insumoId:estoqueInsumo.insumoId,
        quantidade: estoqueInsumo.quantidade,
        preco: estoqueInsumo.preco,
        atualizadaEm: getFirebaseTimeStamp(estoqueInsumo.atualizadaEm),
      criadaEm: getFirebaseTimeStamp(estoqueInsumo.criadaEm),
     
    };
  }

  static fromFirestore(data: EstoqueInsumoFirebase, id: string): EstoqueInsumo {
    return new EstoqueInsumo({
      id,
      insumoId:data.insumoId,
      quantidade: data.quantidade,
      preco: data.preco,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      atualizadaEm:data.atualizadaEm.toDate()|| new Date(),
      
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}