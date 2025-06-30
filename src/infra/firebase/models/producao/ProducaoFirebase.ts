import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { Produto } from "@/domain/entities/producao/Produto";
import { ProducaoStatus } from "@/domain/types/producaoStatus.enum";
import { Timestamp } from "firebase-admin/firestore";


export interface ProducaoFirebase{
    quantidade: number;
    status: ProducaoStatus;
    produtoId:string;
    fazendaId: string;
    criadaEm?: Timestamp | null

}