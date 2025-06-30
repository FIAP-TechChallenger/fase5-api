import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IEstoqueProdutoRepository } from "@/domain/repositories/producao/IEstoqueProdutoRepository";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProdutoInserirDTO";

export class EstoqueProdutoService {
  constructor(private readonly estoqueProdutoRepository: IEstoqueProdutoRepository) {}

  async getAll(): Promise<EstoqueProduto[]> {
    return this.estoqueProdutoRepository.getAll();
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

