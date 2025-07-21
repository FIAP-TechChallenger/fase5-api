import { IVendaRepository } from "@/domain/repositories/comercial/IvendaRepository";
import { VendaInserirDTO } from "@/application/dtos/comercial/Venda/VendaInserirDTO";
import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/Venda/VendaBUscarTodosResponseDTO";
import { Venda } from "@/domain/entities/comercial/Venda";
import { gerarUUID } from "@/shared/utils/gerarUUID";
import { VendaAtualizarDTO } from "@/application/dtos/comercial/Venda/VendaAtualizarDTO";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";
import { IDashboardComercialService } from "@/domain/interfaces/IDashboardComercialService";
import { IEstoqueProdutoService } from "@/domain/interfaces/IEstoqueProdutoService";
import { IMetaAtualizarValorPorTipoService } from "@/domain/interfaces/IMetaAtualizarValorPorTipoService";
import { MetaTipoEnum } from "@/domain/types/meta.enum";
import { VendaStatusEnum } from "@/domain/types/venda.enum";
import { ItemVenda } from "@/domain/entities/comercial/ItemVenda";

export class VendaService {
  constructor(
    private readonly vendaRepository: IVendaRepository,
    private readonly produtoRepository: IProdutoRepository,
    private readonly dashboardService: IDashboardComercialService,
    private readonly estoqueProdutoService: IEstoqueProdutoService,
    private readonly metaAtualizarValorPorTipoService: IMetaAtualizarValorPorTipoService
  ) {}

  async buscarTodos(
    dto: VendaBuscarTodosDTO
  ): Promise<VendaBuscarTodosResponseDTO> {
    const response = await this.vendaRepository.buscarTodos(dto);

    const vendasComNomeProduto = await Promise.all(
      response.dados.map(async (venda) => {
        const itensComNome = await Promise.all(
          venda.itens.map(async (item) => {
            let produtoNome = "";
            try {
              produtoNome = await this.produtoRepository.buscarNome(
                item.produtoId
              );
            } catch (error) {
              produtoNome = "Produto não encontrado";
            }
            return { ...item, produtoNome };
          })
        );
        return { ...venda, itens: itensComNome };
      })
    );

    return { ...response, dados: vendasComNomeProduto };
  }

  async inserir(dto: VendaInserirDTO): Promise<void> {
    const produtosInvalidos: string[] = [];

    for (const item of dto.itens) {
      try {
        const produto = await this.produtoRepository.buscarPorId(
          item.produtoId
        );
        if (!produto) {
          produtosInvalidos.push(item.produtoId);
        }

        await this.estoqueProdutoService.verificarEDebitarEstoque(
          item.produtoId,
          item.quantidade
        );
      } catch (error: any) {
        produtosInvalidos.push(item.produtoId);
      }
    }

    if (produtosInvalidos.length > 0) {
      throw new Error(
        `Produtos não encontrados ou com estoque insuficiente: ${produtosInvalidos.join(
          ", "
        )}`
      );
    }

    const itensCalculados = dto.itens.map((item) => {
      const lucroTotal = item.precoUnitario * item.quantidade;
      return {
        id: gerarUUID(),
        desconto: item.desconto,
        quantidade: item.quantidade,
        produtoId: item.produtoId,
        fazendaId: item.fazendaId === null ? undefined : item.fazendaId,
        precoUnitario: item.precoUnitario,
        lucroUnitario: lucroTotal,
      } as ItemVenda;
    });

    const valorTotal = itensCalculados.reduce((total, item) => {
      return total + item.quantidade * item.precoUnitario;
    }, 0);

    const novaVenda: Venda = {
      id: gerarUUID(),
      criadaEm: new Date(),
      dataVenda: dto.dataVenda,
      cliente: dto.cliente,
      imposto: dto.imposto ?? 0,
      valorTotal,
      status: dto.status,
      itens: itensCalculados,
    };

    await this.vendaRepository.inserir(novaVenda);

    for (const item of itensCalculados) {
      this.dashboardService.atualizar({
        produtoId: item.produtoId,
        dataVenda: dto.dataVenda,
        lucro: item.lucroUnitario,
        qtdVendida: item.quantidade,
      });
    }

    if (dto.status === VendaStatusEnum.VENDIDA) {
      const qtdTotal = itensCalculados.reduce((total, item) => {
        return total + item.quantidade;
      }, 0);

      this.metaAtualizarValorPorTipoService.executar(MetaTipoEnum.VENDA, {
        quantidade: qtdTotal,
        valor: valorTotal,
      });
    }
  }

  async atualizar(dto: VendaAtualizarDTO): Promise<void> {
    const vendaExistente = await this.vendaRepository.buscarPorId(dto.id);
    if (!vendaExistente) throw new Error("Venda não encontrada");

    const itensAtualizados = dto.itens.map(
      (item) =>
        ({
          id: item.id ?? gerarUUID(),
          desconto: item.desconto,
          quantidade: item.quantidade,
          produtoId: item.produtoId,
          fazendaId: item.fazendaId === null ? undefined : item.fazendaId,
          precoUnitario: item.precoUnitario,
          lucroUnitario: item.lucroUnitario,
        } as ItemVenda)
    );

    const vendaAtualizada: Venda = {
      ...vendaExistente,
      ...dto,
      itens: itensAtualizados,
      criadaEm: vendaExistente.criadaEm,
    };

    await this.vendaRepository.atualizar(vendaAtualizada);

    if (dto.status === VendaStatusEnum.VENDIDA) {
      const quantidade = itensAtualizados.reduce((total, item) => {
        return total + item.quantidade;
      }, 0);
      const valorTotalVenda = itensAtualizados.reduce((total, item) => {
        return total + item.quantidade * item.precoUnitario;
      }, 0);

      this.metaAtualizarValorPorTipoService.executar(MetaTipoEnum.VENDA, {
        quantidade,
        valor: valorTotalVenda,
      });
    }
  }
}
