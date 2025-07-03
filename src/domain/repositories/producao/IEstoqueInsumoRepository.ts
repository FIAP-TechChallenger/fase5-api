import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";

export interface IEstoqueInsumoRepository{
   // buscarPorId(id: string): Promise<Fazenda | null>;
   buscarTodos(dto:EstoqueInsumoBuscarTodosDTO): Promise<EstoqueInsumoBuscarTodosResponseDTO>
   insert(estoqueInsumo: EstoqueInsumo ): Promise<void>;
   // atualizar(fazenda: Fazenda ): Promise<void>;

}
