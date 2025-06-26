import { Insumo } from "@/domain/entities/producao/Insumo"

export interface IINsumoRepository{
    getAll(): Promise<Insumo[]>
    insert(insumo:Insumo): Promise<void>
}