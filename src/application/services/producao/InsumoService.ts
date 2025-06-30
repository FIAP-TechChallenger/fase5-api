import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { IINsumoRepository } from "@/domain/repositories/producao/IInsumoRepository";
import { Insumo } from "@/domain/entities/producao/Insumo";
import { InsumoInserirDTO } from "@/application/dtos/producao/InsumoInserirDTO";

export class InsumoService {
  constructor(private readonly insumoRepository: IINsumoRepository) {}

  async getAll(): Promise<Insumo[]> {
    return this.insumoRepository.getAll();
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
