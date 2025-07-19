import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IEstoqueProdutoRepository } from "@/domain/repositories/producao/IEstoqueProdutoRepository";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { EstoqueProdutoInserirDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoInserirDTO";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueProdutoBuscarTodosResponseDTO, EstoqueProdutoItemDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoBuscarTodosResponseDTO";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { EstoqueProdutoAtualizarDTO } from "@/application/dtos/producao/EstoqueProduto/EstoqueProdutoAtualizarDTO";

export class EstoqueProdutoService {
  constructor(
    private readonly estoqueProdutoRepository: IEstoqueProdutoRepository,
    private readonly produtoRepository: IProdutoRepository,
    private readonly medidaRepository: IMedidaRepository
  ) {}

  async buscarTodos(dto : EstoqueInsumoBuscarTodosDTO): Promise<EstoqueProdutoBuscarTodosResponseDTO> {
    const response = await this.estoqueProdutoRepository.buscarTodos(dto);
    
    const dadosEnriquecidos = await Promise.all(
      response.dados.map(async (estoque) => {
      
        const produto = await this.produtoRepository.buscarPorId(estoque.produtoId);
        
        if (!produto) {
          return {
            ...estoque,
            insumoProduto: "Produto não encontrado",
            unidadeMedidaSigla: ""
          } as EstoqueProdutoItemDTO;
        }
        
        const sigla = await this.medidaRepository.buscarSigla(produto.unidadeMedidaId);

        return {
          ...estoque,
          produtoNome: produto.nome,
          unidadeMedidaSigla: sigla
        } as EstoqueProdutoItemDTO;
      })
    );

    return {
      dados: dadosEnriquecidos,
      ultimoId: response.ultimoId,
      temMais: response.temMais
    };
  }

  async inserir(dto: EstoqueProdutoInserirDTO): Promise<void> {
    const novoEstoque: EstoqueProduto = {
      id: gerarUUID(),
      produtoId: dto.produtoId,
      fazendaId:dto.fazendaId,
      quantidade: dto.quantidade,
      preco: dto.preco,
      lote: dto.lote ?? "",
      producaoId: dto.producaoId,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    }
      await this.estoqueProdutoRepository.insert(novoEstoque)
  }
  async atualizar(dto: EstoqueProdutoAtualizarDTO): Promise<void> {
    const estoqueExistente = await this.estoqueProdutoRepository.buscarPorId(dto.id);
    if (!estoqueExistente) throw new Error("Meta não encontrada");

    const metaAtualizada: EstoqueProduto = {
      ...estoqueExistente,
      ...dto,
      atualizadaEm: new Date()
     
    };

    await this.estoqueProdutoRepository.atualizar(metaAtualizada);
  }
  
}

