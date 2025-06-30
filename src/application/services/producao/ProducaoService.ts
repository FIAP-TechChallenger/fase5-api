import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Producao } from "@/domain/entities/producao/Producao";
import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";
import { ProducaoInserirDTO } from "@/application/dtos/producao/ProducaoInserirDTO";
import { ProducaoStatus } from "@/domain/types/producaoStatus.enum";

export class ProducaoService {
  constructor(private readonly producaoRepository: IProducaoRepository) {}

  async getAll(): Promise<Producao[]> {
    return this.producaoRepository.getAll();
  }

  async inserir(dto: ProducaoInserirDTO): Promise<void> {
    const novaProducao: Producao = {
      id: gerarUUID(),
      quantidade: dto.quantidade,
      status: dto.status as ProducaoStatus,
      criadaEm: new Date(),
      produtoId: dto.produtoId,
      fazendaId: dto.fazendaId,
      
    };
    await this.producaoRepository.insert(novaProducao);
  }
}
;