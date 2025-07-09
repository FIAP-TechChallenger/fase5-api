import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { Produto } from "@/domain/entities/producao/Produto";
import { ProdutoInserirDTO } from "@/application/dtos/producao/Produto/ProdutoInserirDTO";
import { ProdutoBuscarTodosResponseDTO } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosResponseDTO";
import { ProdutoBuscarTodosDTO } from "@/application/dtos/producao/Produto/ProdutoBuscarTodosDTO";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { ProdutoAtualizarDTO } from "@/application/dtos/producao/Produto/ProdutoAtualizarDTO";

export class ProdutoService {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly unidadeMedidaService: IMedidaRepository,
  ) {}

  async buscarTodos(dto: ProdutoBuscarTodosDTO): Promise<ProdutoBuscarTodosResponseDTO> {
    const response = await this.produtoRepository.buscarTodos(dto);
  
    const produtosComSigla = await Promise.all(
      response.dados.map(async (produto) => {
        const sigla = await this.unidadeMedidaService.buscarSigla(produto.unidadeMedidaId);
        return new Produto({ ...produto, unidadeMedidaSigla: sigla });
      })
    );
  
    return {
      dados: produtosComSigla,
      temMais: response.temMais,
      ultimoId: response.ultimoId,
    };
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
  async atualizar(dto: ProdutoAtualizarDTO): Promise<void> {
    const produtoExistente = await this.produtoRepository.buscarPorId(dto.id);
    if (!produtoExistente) throw new Error("Meta não encontrada");

    const produtoAtualizado: Produto = {
      ...produtoExistente,
      ...dto,
     
    };

    await this.produtoRepository.atualizar(produtoAtualizado);
  }
}
