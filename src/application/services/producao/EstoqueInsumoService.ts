import { gerarUUID } from "@/shared/utils/gerarUUID";
import { IEstoqueInsumoRepository } from "@/domain/repositories/producao/IEstoqueInsumoRepository";
import { EstoqueInsumo } from "@/domain/entities/producao/EstoqueInsumo";
import { EstoqueInsumoInserirDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoInserirDTO";
import { EstoqueInsumoBuscarTodosDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosDTO";
import { EstoqueInsumoBuscarTodosResponseDTO, EstoqueInsumoItemDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoBuscarTodosResponseDTO";
import { IInsumoRepository } from "@/domain/repositories/producao/IInsumoRepository";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { EstoqueInsumoAtualizarDTO } from "@/application/dtos/producao/EstoqueInsumo/EstoqueInsumoAtualizarDTO";

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
        // Busca o insumo completo pelo ID
        const insumo = await this.insumoRepository.buscarPorId(estoque.insumoId);
        
        if (!insumo) {
          return {
            ...estoque,
            insumoNome: "Insumo não encontrado",
            unidadeMedidaSigla: ""
          } as EstoqueInsumoItemDTO;
        }
        
        // Busca a sigla usando o ID da unidade do insumo
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
}


