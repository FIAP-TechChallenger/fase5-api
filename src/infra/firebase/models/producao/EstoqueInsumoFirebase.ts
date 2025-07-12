import { Insumo } from "@/domain/entities/producao/Insumo";
import { Timestamp } from "firebase-admin/firestore";

export interface EstoqueInsumoFirebase{
    insumoId:string,
    quantidade: number,
    preco:number, 
    criadaEm?: Timestamp | null
    atualizadaEm: Timestamp;
}