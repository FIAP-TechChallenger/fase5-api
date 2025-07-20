import { EstoqueProdutoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosResponseDTO";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";

export interface IEstoqueProdutoRepository {
    buscarPorId(id: string): Promise<EstoqueProduto | null>;
    buscarTodos(dto : EstoqueProdutoBuscarTodosDTO): Promise<EstoqueProdutoBuscarTodosResponseDTO>
    insert( estoqueProduto : EstoqueProduto ): Promise<void>;
    atualizar(estoque: EstoqueProduto ): Promise<void>;
    buscarPorProdutoOrdenado(produtoId: string): Promise<EstoqueProduto[]>;
    debitarQuantidade(estoqueId: string, quantidade: number): Promise<void>;
} 