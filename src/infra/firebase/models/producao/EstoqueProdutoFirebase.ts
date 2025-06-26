import { Produto } from "@/domain/entities/producao/Produto";
import { Timestamp } from "firebase-admin/firestore";

export interface EstoqueProdutoFirebase {
    produto: Produto;
    quantidade: number;
    preco: number;
    criadaEm?: Timestamp | null
} 