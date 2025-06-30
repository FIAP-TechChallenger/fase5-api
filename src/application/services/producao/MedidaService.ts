import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { FazendaInserirDTO } from "@/application/dtos/producao/FazendaInserirDTO";
import { IMedidaRepository } from "@/domain/repositories/producao/IMedidaRepository";
import { Medida } from "@/domain/entities/producao/Medida";
import { MedidaInserirDTO } from "@/application/dtos/producao/MedidaInserirDTO";


export class MedidaService {
  constructor(private readonly medidaRepository: IMedidaRepository) {}

  async getAll(): Promise<Fazenda[]> {
    return this.medidaRepository.getAll();
  }

  async inserir(dto: MedidaInserirDTO): Promise<void> {
    const novaMedida: Medida = {
      id: gerarUUID(),
      nome: dto.nome,
      sigla: dto.sigla,
      criadaEm: new Date(),
    };
    await this.medidaRepository.insert(novaMedida);
  }
}
