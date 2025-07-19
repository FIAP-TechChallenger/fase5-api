import { Produto } from "@/domain/entities/producao/Produto";
import { Timestamp } from "firebase-admin/firestore";

export interface EstoqueProdutoFirebase {
    produtoId: string;
    quantidade: number;
    preco?: number;
    lote?: string;
    criadaEm?: Timestamp | null;
    atualizadaEm?: Timestamp | null;
    producaoId: string;
    fazendaId:string;
  }