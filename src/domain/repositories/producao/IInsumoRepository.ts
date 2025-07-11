import { InsumoBuscarTodosDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosDTO";
import { InsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosResponseDTO";
import { Insumo } from "@/domain/entities/producao/Insumo"

export interface IInsumoRepository{
    buscarPorId(id: string): Promise<Insumo| null>;
    buscarPorIds(ids: string[]): Promise<Insumo[]>; 
    buscarTodos(dto:InsumoBuscarTodosDTO): Promise<InsumoBuscarTodosResponseDTO>
    insert(insumo: Insumo ): Promise<void>;
    atualizar(insumo: Insumo ): Promise<void>;
  
}