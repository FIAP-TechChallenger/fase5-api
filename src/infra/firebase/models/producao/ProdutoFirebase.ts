import { Medida } from "@/domain/entities/producao/Medida";
import { Timestamp } from "firebase-admin/firestore";

export interface ProdutoFirebase {
    nome:string;
    unidadeMedida:Medida; 
    criadaEm?: Timestamp | null
}