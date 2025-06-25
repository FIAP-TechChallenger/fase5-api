import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Fazenda } from "@/domain/entities/producao/Fazenda";
import { IFazendaRepository } from "@/domain/repositories/producao/IFazendaRepository";
import { FazendaInserirDTO } from "@/application/dtos/producao/FazendaInserirDTO";

export class FazendaService {
  constructor(private readonly fazendaRepository: IFazendaRepository) {}

  async getAll(): Promise<Fazenda[]> {
    return this.fazendaRepository.getAll();
  }

  async inserir(dto: FazendaInserirDTO): Promise<void> {
    const novaFazenda: Fazenda = {
      id: gerarUUID(),
      nome:dto.nome,
      criadaEm: new Date(),
      atualizadaEm: new Date(),
    };
    await this.fazendaRepository.insert(novaFazenda);
  }
}
