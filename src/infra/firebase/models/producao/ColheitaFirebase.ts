import { Timestamp } from "firebase-admin/firestore";

export interface ColheitaFirebase {
    quantidadeColhida: number;
    perdas: number;
    custoProducao?: number;
    preco: number;
    producaoId: string;
    dataInicio: Timestamp;
    dataFim: Timestamp;
    criadaEm?: Timestamp | null
  }