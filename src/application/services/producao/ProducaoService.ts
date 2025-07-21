import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Producao } from "@/domain/entities/producao/Producao";
import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";
import { ProducaoInserirDTO } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoStatusEnum } from "@/domain/types/producao.enum";
import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import {
  ProducaoBuscarTodosResponseDTO,
  ProducaoItemDTO,
} from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponse";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { IFazendaRepository } from "@/domain/repositories/producao/IFazendaRepository";
import { IEstoqueProdutoRepository } from "@/domain/repositories/producao/IEstoqueProdutoRepository";
import { ProducaoAtualizarDTO } from "@/application/dtos/producao/Producao/ProducaoAtualizarDTO";
import { IMetaAtualizarValorPorTipoService } from "@/domain/interfaces/IMetaAtualizarValorPorTipoService";
import { IDashboardProducaoService } from "@/domain/interfaces/IDashboardProducaoService";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";
import { IEstoqueInsumoRepository } from "@/domain/repositories/producao/IEstoqueInsumoRepository";
import { IEstoqueInsumoService } from "@/domain/interfaces/IEstoqueInsumoService";
import { MetaTipoEnum } from "@/domain/types/meta.enum";

export class ProducaoService {
  constructor(
    private readonly producaoRepository: IProducaoRepository,
    private readonly fazendaRepository: IFazendaRepository,
    private readonly produtoRepository: IProdutoRepository,
    private readonly estoqueProdutoRepository: IEstoqueProdutoRepository,
    private readonly metaAtualizarValorPorTipoService: IMetaAtualizarValorPorTipoService,
    private readonly dashboardService: IDashboardProducaoService,
    private readonly estoqueInsumoService: IEstoqueInsumoService // <--- adicionado
  ) {}

  async buscarTodos(
    dto: ProducaoBuscarTodosDTO
  ): Promise<ProducaoBuscarTodosResponseDTO> {
    const response = await this.producaoRepository.buscarTodos(dto);

    const producaoCompleta = await Promise.all(
      response.dados.map(async (producao) => {
        const nomeFazenda = await this.fazendaRepository.buscarNome(
          producao.fazendaId
        );
        const nomeProduto = await this.produtoRepository.buscarNome(
          producao.produtoId
        );
        return {
          ...producao,
          fazendaNome: nomeFazenda,
          produtoNome: nomeProduto,
        } as ProducaoItemDTO;
      })
    );

    return {
      dados: producaoCompleta,
      temMais: response.temMais,
      ultimoId: response.ultimoId,
    };
  }

  async atualizar(dto: ProducaoAtualizarDTO): Promise<void> {
    const producaoExistente = await this.producaoRepository.buscarPorId(dto.id);
    if (!producaoExistente) throw new Error("producao não encontrada");

    const producaoAtualizada: Producao = {
      ...producaoExistente,
      ...dto,
      atualizadaEm: new Date(),
    };

    await this.producaoRepository.atualizar(producaoAtualizada);

    if (
      producaoAtualizada.precoFinal === undefined ||
      producaoAtualizada.custoProducao === undefined ||
      producaoAtualizada.quantidadeColhida === undefined
    ) {
      throw new Error(
        "Campos obrigatórios não preenchidos para calcular o preço unitário."
      );
    }

    this.dashboardService.atualizar({
      producaoId: producaoExistente.id,
      qtdPlanejada: producaoExistente.quantidadePlanejada,
      qtdColhida: producaoAtualizada.quantidadeColhida ?? 0,
      statusAnterior: producaoExistente.status,
      statusAtual: producaoAtualizada.status,
      data: new Date(),
    });

    if (producaoAtualizada.status === ProducaoStatusEnum.COLHIDA) {
      await this._addEstoqueProduto(producaoAtualizada);

      if (!!dto.quantidadeColhida && dto.quantidadeColhida > 0) {
        this.metaAtualizarValorPorTipoService.executar(MetaTipoEnum.PRODUCAO, {
          quantidade: dto.quantidadeColhida,
        });
      }
    }
  }

  async inserir(dto: ProducaoInserirDTO): Promise<void> {
    const novaProducao: Producao = {
      id: gerarUUID(),
      quantidadePlanejada: dto.quantidadePlanejada,
      precoPlanejado: dto.precoPlanejado ?? 0,
      status: dto.status as ProducaoStatusEnum,
      lote: dto.lote,
      produtoId: dto.produtoId,
      fazendaId: dto.fazendaId,
      insumos: dto.insumos,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      perdas: dto.perdas,
      custoProducao: dto.custoProducao,
      precoFinal: dto.precoFinal,
      quantidadeColhida: dto.quantidadeColhida,
    };

    if (
      novaProducao.status === ProducaoStatusEnum.COLHIDA &&
      (novaProducao.precoFinal === undefined ||
        novaProducao.custoProducao === undefined ||
        novaProducao.quantidadeColhida === undefined)
    ) {
      throw new Error(
        "Campos obrigatórios não preenchidos para calcular o preço unitário."
      );
    }

    // // 🔁 1. Verificar e debitar os insumos antes de inserir
    for (const insumo of dto.insumos) {
      await this.estoqueInsumoService.verificarEDebitarEstoque(
        insumo.insumoId,
        insumo.quantidade
      );
    }

    if (novaProducao.status === ProducaoStatusEnum.COLHIDA) {
      await this._addEstoqueProduto(novaProducao);

      if (!!dto.quantidadeColhida && dto.quantidadeColhida > 0) {
        this.metaAtualizarValorPorTipoService.executar(MetaTipoEnum.PRODUCAO, {
          quantidade: dto.quantidadeColhida,
        });
      }
    }

    await this.producaoRepository.insert(novaProducao);

    this.dashboardService.atualizar({
      producaoId: novaProducao.id,
      qtdPlanejada: novaProducao.quantidadePlanejada,
      qtdColhida: novaProducao.quantidadeColhida ?? 0,
      statusAnterior: null,
      statusAtual: novaProducao.status,
      data: new Date(),
    });
  }

  private async _addEstoqueProduto(producao: Producao) {
    const precoUnitario = producao.precoFinal! / producao.quantidadeColhida!;

    const novoEstoqueProduto: EstoqueProduto = {
      id: gerarUUID(),
      produtoId: producao.produtoId,
      fazendaId: producao.fazendaId,
      quantidade: producao.quantidadeColhida!,
      preco: producao.precoPlanejado ?? 0,
      lote: producao.lote ?? "",
      criadaEm: new Date(),
      atualizadaEm: new Date(),
      producaoId: producao.id,
      precoUnitario: precoUnitario,
    };

    await this.estoqueProdutoRepository.insert(novoEstoqueProduto);
  }
}
