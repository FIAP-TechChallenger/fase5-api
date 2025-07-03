import { EstoqueProdutoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosResponseDTO";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";

export interface IEstoqueProdutoRepository {
    // buscarPorId(id: string): Promise<Fazenda | null>;
    buscarTodos(dto : EstoqueProdutoBuscarTodosDTO): Promise<EstoqueProdutoBuscarTodosResponseDTO>
    insert( estoqueProduto : EstoqueProduto ): Promise<void>;
    // atualizar(fazenda: Fazenda ): Promise<void>;
} 