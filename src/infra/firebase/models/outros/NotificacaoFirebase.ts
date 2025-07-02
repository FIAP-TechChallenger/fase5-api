import { NotificacaoTipoEnum } from "@/domain/types/notificacao.enum";
import { Timestamp } from "firebase-admin/firestore";

export interface NotificacaoFirebase {
  titulo: string;
  descricao: string;
  tipo: NotificacaoTipoEnum;
  dataEnvio: Timestamp;
  lida: boolean;
}
