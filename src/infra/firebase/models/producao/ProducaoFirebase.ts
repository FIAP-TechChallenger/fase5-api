
import { Timestamp } from "firebase-admin/firestore";


export interface ProducaoFirebase{
    quantidade: number;
    status: string;
    produtoId:string;
    fazendaId: string;
    criadaEm?: Timestamp | null

}