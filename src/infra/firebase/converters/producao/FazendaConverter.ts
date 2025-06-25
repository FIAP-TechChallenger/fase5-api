import { Timestamp } from "firebase-admin/firestore";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { FazendaFirebase } from "@/infra/firebase/models/producao/FazendaFirebase";

export class FazendaConverter {
  static toFirestore(fazenda: Fazenda): FazendaFirebase {
    return {
      nome: fazenda.nome,
      criadaEm: this._toTimestamp(fazenda.criadaEm), 
      atualizadaEm: this._toTimestamp(fazenda.atualizadaEm),
    };
  }

  static fromFirestore(data: FazendaFirebase, id: string): Fazenda {
    return new Fazenda({
      id,
      nome: data.nome,
      criadaEm: data.criadaEm?.toDate() || new Date(),
      atualizadaEm: data.atualizadaEm?.toDate() || new Date(),
    });
  }

  private static _toTimestamp(date?: Date): Timestamp | null {
    return date ? Timestamp.fromDate(date) : null;
  }
}