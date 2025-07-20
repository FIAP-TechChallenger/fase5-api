import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";

export interface IEstoqueInsumoRepository{
   buscarPorId(id: string): Promise<EstoqueInsumo | null>;
   buscarTodos(dto:EstoqueInsumoBuscarTodosDTO): Promise<EstoqueInsumoBuscarTodosResponseDTO>
   insert(estoqueInsumo: EstoqueInsumo ): Promise<void>;
   atualizar(estoque: EstoqueInsumo): Promise<void>;
   buscarPorInsumoId(insumoId: string): Promise<EstoqueInsumo | null>;
   buscarPorInsumoOrdenado(insumoId: string): Promise<EstoqueInsumo[]>;
   debitarQuantidade(estoqueId: string, quantidade: number): Promise<void>;

   



 }


