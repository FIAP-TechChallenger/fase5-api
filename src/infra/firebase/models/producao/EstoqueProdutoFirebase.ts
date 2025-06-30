import { Produto } from "@/domain/entities/producao/Produto";
import { Timestamp } from "firebase-admin/firestore";

export interface EstoqueProdutoFirebase {
    produtoId: string;
    quantidade: number;
    preco: number;
    criadaEm?: Timestamp | null
} 