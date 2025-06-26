import { Insumo } from "@/domain/entities/producao/Insumo";
import { Timestamp } from "firebase-admin/firestore";

export interface EstoqueInsumoFirebase{
    insumo:Insumo,
    quantidade: number,
    preco:number, 
    criadaEm?: Timestamp | null
}