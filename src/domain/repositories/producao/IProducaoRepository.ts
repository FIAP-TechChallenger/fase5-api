import { Producao } from "@/domain/entities/producao/Producao";

export interface IProducaoRepository{
    getAll():Promise<Producao[]>;
    insert(producao: Producao):Promise<void>;
    // update(userId:string ,producao: Producao): Promise<void>;
}