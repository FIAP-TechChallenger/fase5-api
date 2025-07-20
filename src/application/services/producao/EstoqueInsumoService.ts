import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IEstoqueInsumoRepository } from "@/domain/repositories/producao/IEstoqueInsumoRepository";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
import { EstoqueInsumoInserirDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO, EstoqueInsumoItemDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { IInsumoRepository } from "@/domain/repositories/producao/IInsumoRepository";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { EstoqueInsumoAtualizarDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";
import { admin } from "@/infra/firebase/firebase-initialize";

export class EstoqueInsumoService {
  constructor(
    private readonly estoqueInsumoRepository: IEstoqueInsumoRepository,
    private readonly insumoRepository: IInsumoRepository,
    private readonly medidaRepository: IMedidaRepository
  ) {}

  async buscarTodos(dto: EstoqueInsumoBuscarTodosDTO): Promise<EstoqueInsumoBuscarTodosResponseDTO> {
    const response = await this.estoqueInsumoRepository.buscarTodos(dto);
    
    const dadosEnriquecidos = await Promise.all(
      response.dados.map(async (estoque) => {
        const insumo = await this.insumoRepository.buscarPorId(estoque.insumoId);
        
        if (!insumo) {
          return {
            ...estoque,
            insumoNome: "Insumo não encontrado",
            unidadeMedidaSigla: ""
          } as EstoqueInsumoItemDTO;
        }
        
        const sigla = await this.medidaRepository.buscarSigla(insumo.unidadeMedidaId);

        return {
          ...estoque,
          insumoNome: insumo.nome,
          unidadeMedidaSigla: sigla
        } as EstoqueInsumoItemDTO;
      })
    );

    return {
      dados: dadosEnriquecidos,
      ultimoId: response.ultimoId,
      temMais: response.temMais
    };
  }
  async inserir(dto: EstoqueInsumoInserirDTO): Promise<void> {
    const novoEstoque: EstoqueInsumo = {
      id: gerarUUID(),
      insumoId:dto.insumoId ?? "",
      quantidade:dto.quantidade,
      preco:dto.preco,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
   
    };
    await this.estoqueInsumoRepository.insert(novoEstoque);
  }
  
  async atualizar(dto: EstoqueInsumoAtualizarDTO): Promise<void> {
    const estoqueExistente = await this.estoqueInsumoRepository.buscarPorId(dto.id);
    if (!estoqueExistente) throw new Error("Meta não encontrada");

    const estoqueAtualizado: EstoqueInsumo = {
      ...estoqueExistente,
      ...dto,
      
    };

    await this.estoqueInsumoRepository.atualizar(estoqueAtualizado);
  }
  async verificarEDebitarEstoque(insumoId: string, quantidadeNecessaria: number): Promise<void> {
    const lotes = await this.estoqueInsumoRepository.buscarPorInsumoOrdenado(insumoId);
    // console.log("[DEBUG] Lotes encontrados para insumoId", insumoId, lotes);
    const totalDisponivel = lotes.reduce((total, lote) => total + lote.quantidade, 0);
    // console.log("[DEBUG] Total disponível:", totalDisponivel, "| Quantidade necessária:", quantidadeNecessaria);
    if (totalDisponivel < quantidadeNecessaria) {
      console.error(`[ERRO] Estoque insuficiente para o insumo ${insumoId}. Total disponível: ${totalDisponivel}, necessário: ${quantidadeNecessaria}`);
      throw new Error(`Estoque insuficiente para o insumo ${insumoId}`);
    }

    let quantidadeRestante = quantidadeNecessaria;

    for (const lote of lotes) {
      if (quantidadeRestante === 0) break;
      const quantidadeParaDebitar = Math.min(lote.quantidade, quantidadeRestante);
      // console.log(`[DEBUG] Debitando do lote ${lote.id}: ${quantidadeParaDebitar} (antes: ${lote.quantidade})`);
      await this.estoqueInsumoRepository.debitarQuantidade(lote.id, quantidadeParaDebitar);
      quantidadeRestante -= quantidadeParaDebitar;
      // console.log(`[DEBUG] Restante a debitar: ${quantidadeRestante}`);
    }
    // console.log(`[DEBUG] Débito de insumo ${insumoId} concluído.`);
  }
}


