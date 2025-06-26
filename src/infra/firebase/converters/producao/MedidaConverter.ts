import { Timestamp } from "firebase-admin/firestore";
import { Medida } from "@/domain/entities/producao/Medida";
import { MedidaFirebase } from "../../models/producao/MedidaFirebase";

export class MedidaConverter {
  static toFirestore(medida: Medida): MedidaFirebase {
    return {
      nome: medida.nome,
      sigla:medida.sigla,
      criadaEm: this._toTimestamp(medida.criadaEm), 
     
    };
  }

  static fromFirestore(data: MedidaFirebase, id: string): Medida {
    return new Medida({
      id,
      nome: data.nome,
      sigla: data.sigla,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}