import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { Produto } from "@/domain/entities/producao/Produto";
import { ProdutoInserirDTO } from "@/application/dtos/producao/Produto/ProdutoInserirDTO";
import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosResponseDTO";

export class ProdutoService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async buscarTodos(dto:ProducaoBuscarTodosDTO): Promise<ProdutoBuscarTodosResponseDTO> {
    return this.produtoRepository.buscarTodos(dto);
  }

  async inserir(dto: ProdutoInserirDTO): Promise<void> {
    const novaProduto: Produto = {
      id: gerarUUID(),
      nome:dto.nome,
      unidadeMedidaId:dto.unidadeMedidaId,
      criadaEm: new Date(),
     
    };
    await this.produtoRepository.insert(novaProduto);
  }
}
