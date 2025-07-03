import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Insumo } from "@/domain/entities/producao/Insumo";
import { InsumoInserirDTO } from "@/application/dtos/producao/Insumo/InsumoInserirDTO";
import { InsumoBuscarTodosResponseDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosResponseDTO";
import { InsumoBuscarTodosDTO } from "@/application/dtos/producao/Insumo/InsumoBuscarTodosDTO";
import { IInsumoRepository } from "@/domain/repositories/producao/IInsumoRepository";

export class InsumoService {
  constructor(private readonly insumoRepository: IInsumoRepository) {}

  async buscarTodos(dto:InsumoBuscarTodosDTO): Promise<InsumoBuscarTodosResponseDTO> {
    return this.insumoRepository.buscarTodos(dto);
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
}
