import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";

export interface IEstoqueInsumoRepository{
    getAll(): Promise<EstoqueInsumo[]>,
    insert( insumoEstoque:EstoqueInsumo):Promise<void>

}