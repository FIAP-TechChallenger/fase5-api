import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import { Timestamp } from "firebase-admin/firestore";

export interface ProducaoFirebase {
  quantidadePlanejada: number;
  precoPlanejado: number;
  status: ProducaoStatusEnum;
  produtoId: string;
  fazendaId: string;
  lote: string;
  insumos: {
    insumoId: string;
    quantidade: number;
  }[];
  colheitaId?: string
  criadaEm: Timestamp;
  atualizadaEm: Timestamp;
  dataInicio: Timestamp;
  dataFim: Timestamp;
}