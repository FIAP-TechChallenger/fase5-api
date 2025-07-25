import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Insumo } from "@/domain/entities/producao/Insumo";
import { InsumoInserirDTO } from "@/application/dtos/producao/Insumo/InsumoInserirDTO";
import { InsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosResponseDTO";
import { InsumoBuscarTodosDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosDTO";
import { IInsumoRepository } from "@/domain/repositories/producao/IInsumoRepository";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { InsumoAtualizarDTO } from "@/application/dtos/producao/Insumo/InsumoAtualizarDTO";

export class InsumoService {
  constructor(
    private readonly insumoRepository: IInsumoRepository,
    private readonly unidadeMedidaService: IMedidaRepository
  ) {}

  async buscarTodos(dto:InsumoBuscarTodosDTO): Promise<InsumoBuscarTodosResponseDTO> {
    const response = await this.insumoRepository.buscarTodos(dto);
  
    const insumosComSigla = await Promise.all(
      response.dados.map(async (insumo) => {
        const sigla = await this.unidadeMedidaService.buscarSigla(insumo.unidadeMedidaId);
        return new Insumo({ ...insumo, unidadeMedidaSigla: sigla });
      })
    );
  
    return {
      dados: insumosComSigla,
      temMais: response.temMais,
      ultimoId: response.ultimoId,
    };
  }
  async buscarPorIds(ids: string[]): Promise<Insumo[]> {
    return this.insumoRepository.buscarPorIds(ids);
  }


  async inserir(dto: InsumoInserirDTO): Promise<void> {
    const novoInsumo: Insumo = {
      id: gerarUUID(),
      nome: dto.nome,
      unidadeMedidaId: dto.unidadeMedidaId,
      criadaEm: new Date(),
    
    };
    await this.insumoRepository.insert(novoInsumo);
  }
  async atualizar(dto: InsumoAtualizarDTO): Promise<void> {
    const insumoExistente = await this.insumoRepository.buscarPorId(dto.id);
    if (!insumoExistente) throw new Error("Meta não encontrada");

    const insumoAtualizado: Insumo = {
      ...insumoExistente,
      ...dto,
      
    };

    await this.insumoRepository.atualizar(insumoAtualizado);
  }
  
}
