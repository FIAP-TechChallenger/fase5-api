import { IVendaRepository } from "@/domain/repositories/comercial/IvendaRepository";
import { VendaInserirDTO } from "@/application/dtos/comercial/Venda/VendaInserirDTO";
import { VendaBuscarTodosDTO } from "@/application/dtos/comercial/Venda/VendaBuscarTodosDTO";
import { VendaBuscarTodosResponseDTO } from "@/application/dtos/comercial/Venda/VendaBUscarTodosResponseDTO";
import { Venda } from "@/domain/entities/comercial/Venda";
import { gerarUUID } from "@/shared/utils/gerarUUID";
import { VendaAtualizarDTO } from "@/application/dtos/comercial/Venda/VendaAtualizarDTO";

export class VendaService {
  constructor(private readonly vendaRepository: IVendaRepository) {}

  async buscarTodos(
    dto: VendaBuscarTodosDTO
  ): Promise<VendaBuscarTodosResponseDTO> {
    return this.vendaRepository.buscarTodos(dto);
  }

  async inserir(dto: VendaInserirDTO): Promise<void> {
    const novaVenda: Venda = {
      id: gerarUUID(),
      criadaEm: new Date(),
      dataVenda: dto.dataVenda,
      cliente: dto.cliente,
      imposto: dto.imposto ?? 0,
      valorTotal: dto.valorTotal,
      status: dto.status,
      itens: dto.itens.map(item => ({
        id: gerarUUID(),
        desconto: item.desconto,
        quantidade: item.quantidade,
        produtoId: item.produtoId,
        fazendaId: item.fazendaId === null ? undefined : item.fazendaId, // <-- aqui!
        precoUnitario: item.precoUnitario,
        lucroUnitario: item.lucroUnitario,
      })),
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