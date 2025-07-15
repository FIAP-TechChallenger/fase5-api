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
import { IMetaAtualizarValorTipoProducaoService } from "@/domain/interfaces/IMetaAtualizarValorTipoProducaoService";
import { IDashboardProducaoService } from "@/domain/interfaces/IDashboardProducaoService";
import { EstoqueProduto } from "@/domain/entities/producao/EstoqueProduto";

export class ProducaoService {
  constructor(
    private readonly producaoRepository: IProducaoRepository,
    private readonly fazendaRepository: IFazendaRepository,
    private readonly produtoRepository: IProdutoRepository,
    private readonly estoqueProdutoRepository: IEstoqueProdutoRepository,
    private readonly metaAtualizarValorTipoProducaoService: IMetaAtualizarValorTipoProducaoService,
    private readonly dashboardService: IDashboardProducaoService
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

    this.dashboardService.atualizar({
      producaoId: producaoExistente.id,
      qtdPlanejada: producaoExistente.quantidadePlanejada,
      qtdColhida: 0, 
      statusAnterior: producaoExistente.status,
      statusAtual: producaoAtualizada.status,
      data: new Date(),
    });

    if (producaoAtualizada.status === ProducaoStatusEnum.COLHIDA) {
      const novoEstoqueProduto : EstoqueProduto = {
        id: gerarUUID(),
        produtoId: producaoAtualizada.produtoId,
        quantidade: producaoAtualizada.quantidadePlanejada,
        preco: producaoAtualizada.precoPlanejado,
        lote: producaoAtualizada.lote ?? "",
        criadaEm: new Date(),
        atualizadaEm: new Date(),            
        producaoId: producaoAtualizada.id, 
      };

      await this.estoqueProdutoRepository.insert(novoEstoqueProduto);

      // this.metaAtualizarValorTipoProducaoService.executar({
      //   qtdColhida: 0, //adicionar
      //   data: novoEstoqueProduto.criadaEm,
      // });
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
      colheitaId: dto.colheitaId ?? "",
      criadaEm: new Date(),
      atualizadaEm: new Date(),
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    };
    await this.producaoRepository.insert(novaProducao);
  }
}
