import { Timestamp } from "firebase-admin/firestore";
import { Colheita } from "@/domain/entities/producao/Colheita";
import { ColheitaFirebase } from "../../models/producao/ColheitaFirebase";
import { getFirebaseTimeStamp } from "@/shared/utils/getFirebaseTimeStamp";


export class ColheitaConverter {
  static toFirestore(colheita: Colheita): ColheitaFirebase {
    return {
      quantidadeColhida: colheita.quantidadeColhida,
      perdas: colheita.perdas,
      custoProducao: colheita.custoProducao,
      preco: colheita.preco,
      producaoId: colheita.producaoId,
      dataInicio: getFirebaseTimeStamp(colheita.dataInicio),
      dataFim: getFirebaseTimeStamp(colheita.dataFim),
      criadaEm: getFirebaseTimeStamp(colheita.criadaEm),
    };
  }

  static fromFirestore(data: ColheitaFirebase, id: string): Colheita {
    return new Colheita({
      id,
      quantidadeColhida: data.quantidadeColhida,
      perdas: data.perdas,
      custoProducao: data.custoProducao,
      preco: data.preco,
      producaoId: data.producaoId,
      dataInicio: data.dataInicio.toDate(),
      dataFim: data.dataFim.toDate(),
      criadaEm: data.criadaEm?.toDate() || new Date()
    });
  }
}