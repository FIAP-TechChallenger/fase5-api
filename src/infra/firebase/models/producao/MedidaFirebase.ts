import { Timestamp } from "firebase-admin/firestore";

export interface MedidaFirebase{
    nome:string,
    sigla: string,
    criadaEm?: Timestamp | null
}