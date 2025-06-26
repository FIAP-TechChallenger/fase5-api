import { Timestamp } from "firebase-admin/firestore";
import { Producao } from "@/domain/entities/producao/Producao";
import { ProducaoFirebase } from "../../models/producao/ProducaoFirebase";

export class ProducaoConverter {
  static toFirestore(producao: Producao): ProducaoFirebase {
    return {
        produto:producao.produto,
        quantidade: producao.quantidade,
        fazenda: producao.fazenda,
        status: producao.status,
        criadaEm: this._toTimestamp(producao.criadaEm), 
     
    };
  }

  static fromFirestore(data: ProducaoFirebase, id: string): Producao {
    return new Producao({
      id,
      produto:data.produto,
      quantidade: data.quantidade,
      fazenda: data.fazenda,
      status: data.status,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}