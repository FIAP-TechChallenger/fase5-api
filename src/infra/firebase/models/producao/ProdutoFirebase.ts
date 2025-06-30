import { Medida } from "@/domain/entities/producao/Medida";
import { Timestamp } from "firebase-admin/firestore";

export interface ProdutoFirebase {
    nome:string;
    unidadeMedidaId:string; 
    criadaEm?: Timestamp | null
}