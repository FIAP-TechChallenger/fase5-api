import { Timestamp } from "firebase-admin/firestore";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { FazendaFirebase } from "@/infra/firebase/models/producao/FazendaFirebase";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";

export class FazendaConverter {
  static toFirestore(fazenda: Fazenda): FazendaFirebase {
    return {
      nome: fazenda.nome,
      criadaEm: getFirebaseTimeStamp(fazenda.criadaEm), 
      atualizadaEm: getFirebaseTimeStamp(fazenda.atualizadaEm),
    };
  }

  static fromFirestore(data: FazendaFirebase, id: string): Fazenda {
    return new Fazenda({
      id,
      nome: data.nome,
      criadaEm: data.criadaEm.toDate() || new Date(),
      atualizadaEm: data.atualizadaEm.toDate() || new Date(),
    });
  }
}