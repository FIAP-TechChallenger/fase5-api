import {
  MetaCalculoPorEnum,
  MetaStatusEnum,
  MetaTipoEnum,
} from "@/domain/types/meta.enum";
import { Timestamp } from "firebase-admin/firestore";

export interface MetaFirebase {
  titulo: string;
  descricao: string;
  tipo: MetaTipoEnum;
  valorAlvo: number;
  valorAtual: number;
  dataInicio: Timestamp;
  dataFim: Timestamp;
  status: MetaStatusEnum;
  calculoPor: MetaCalculoPorEnum;
  usuarioId: string;
  criadaEm: Timestamp;
  atualizadaEm: Timestamp;
  fazendaId: string | null;
}
