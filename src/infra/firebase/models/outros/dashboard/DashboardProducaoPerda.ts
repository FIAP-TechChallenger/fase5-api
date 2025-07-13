import { Timestamp } from "firebase-admin/firestore";

export interface DashboardProducaoPerdaFirebase {
  producaoId: string;
  quantidadeColhida: number;
  quantidadePerdida: number;
  dataColheita: Timestamp;
}
