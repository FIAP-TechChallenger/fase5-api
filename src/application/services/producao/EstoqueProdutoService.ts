import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IEstoqueProdutoRepository } from "@/domain/repositories/producao/IEstoqueProdutoRepository";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosResponseDTO";

export class EstoqueProdutoService {
  constructor(private readonly estoqueProdutoRepository: IEstoqueProdutoRepository) {}

  async buscarTodos(dto : EstoqueInsumoBuscarTodosDTO): Promise<EstoqueProdutoBuscarTodosResponseDTO> {
    return this.estoqueProdutoRepository.buscarTodos(dto);
  }

  async inserir(dto: EstoqueProdutoInserirDTO): Promise<void> {
    const novoEstoque: EstoqueProduto = {
      id: gerarUUID(),
      produtoId:dto.produtoId,
      quantidade:dto.quantidade,
      preco:dto.preco,
      criadaEm: new Date(),
    }
      await this.estoqueProdutoRepository.insert(novoEstoque)
  }
}

