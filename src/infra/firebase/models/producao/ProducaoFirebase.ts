import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { Produto } from "@/domain/entities/producao/Produto";
import { Timestamp } from "firebase-admin/firestore";


export interface ProducaoFirebase{
    quantidade: number;
    status: string;
    data : Date
    produto:Produto;
    fazenda: Fazenda;
    criadaEm?: Timestamp | null

}