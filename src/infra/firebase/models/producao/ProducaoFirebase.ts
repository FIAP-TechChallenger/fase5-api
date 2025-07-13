import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import { Timestamp } from "firebase-admin/firestore";

export interface ProducaoFirebase {
  quantidade: number;
  status: ProducaoStatusEnum;
  produtoId: string;
  fazendaId: string;
  criadaEm?: Timestamp | null;
}
