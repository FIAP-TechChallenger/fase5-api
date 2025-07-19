import { IVendaRepository } from "@/domain/repositories/comercial/IvendaRepository";
import { VendaInserirDTO } from "@/application/dtos/comercial/Venda/VendaInserirDTO";
import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/Venda/VendaBUscarTodosResponseDTO";
import { Venda } from "@/domain/entities/comercial/Venda";
import { gerarUUID } from "@/shared/utils/gerarUUID";
import { VendaAtualizarDTO } from "@/application/dtos/comercial/Venda/VendaAtualizarDTO";
import { IProdutoRepository } from "@/domain/repositories/producao/IProdutoRepository";

export class VendaService {
  constructor(
    private readonly vendaRepository: IVendaRepository,
    private readonly produtoRepository: IProdutoRepository) {}

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
              produtoNome = await this.produtoRepository.buscarNome(item.produtoId);
            } catch {
              produtoNome = "Produto não encontrado";
            }
            return {
              ...item,
              produtoNome
            };
          })
        );
        return {
          ...venda,
          itens: itensComNome
        };
      })
    );
  
    return {
      ...response,
      dados: vendasComNomeProduto
    };
  }

  async inserir(dto: VendaInserirDTO): Promise<void> {
    const itensCalculados = dto.itens.map(item => {
      const lucroTotal = item.precoUnitario  * item.quantidade;
  
      return {
        id: gerarUUID(),
        desconto: item.desconto,
        quantidade: item.quantidade,
        produtoId: item.produtoId,
        fazendaId: item.fazendaId === null ? undefined : item.fazendaId,
        precoUnitario: item.precoUnitario,
        lucroUnitario: lucroTotal,
      };
    });
  
    const valorTotal = itensCalculados.reduce((total, item) => {
      return total + (item.quantidade * item.precoUnitario);
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
  }

  async atualizar(dto: VendaAtualizarDTO): Promise<void> {
    const vendaExistente = await this.vendaRepository.buscarPorId(dto.id);
    if (!vendaExistente) throw new Error("Venda não encontrada");
  
    const itensAtualizados = dto.itens.map(item => ({
      id: item.id ?? gerarUUID(), // Usa o id do DTO ou gera um novo
      desconto: item.desconto,
      quantidade: item.quantidade,
      produtoId: item.produtoId,
      fazendaId: item.fazendaId === null ? undefined : item.fazendaId, // <-- aqui!
      precoUnitario: item.precoUnitario,
      lucroUnitario: item.lucroUnitario,
    }));
  
    const vendaAtualizada: Venda = {
      ...vendaExistente,
      ...dto,
      itens: itensAtualizados,
      criadaEm: vendaExistente.criadaEm,
    };
  
    await this.vendaRepository.atualizar(vendaAtualizada);
  }
}