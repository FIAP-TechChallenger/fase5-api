import { Medida } from "@/domain/entities/producao/Medida";
import { Timestamp } from "firebase-admin/firestore";

export interface InsumoFirebase {
    nome:string,
    unidadeMedidaId: string,
    criadaEm?: Timestamp | null



}