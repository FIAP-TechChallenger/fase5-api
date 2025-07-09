import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";

export interface IEstoqueInsumoRepository{
   buscarPorId(id: string): Promise<EstoqueInsumo | null>;
   buscarTodos(dto:EstoqueInsumoBuscarTodosDTO): Promise<EstoqueInsumoBuscarTodosResponseDTO>
   insert(estoqueInsumo: EstoqueInsumo ): Promise<void>;
   atualizar(estoque: EstoqueInsumo): Promise<void>;

}
