import { Medida } from "@/domain/entities/producao/Medida";

export interface IMedidaRepository{
    getAll(): Promise<Medida[]>,
    insert( medida:Medida): Promise<void>,
}