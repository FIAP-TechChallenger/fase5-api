import { gerarUUID } from "@/shared/utils/gerarUUID";
import { Producao } from "@/domain/entities/producao/Producao";
import { IProducaoRepository } from "@/domain/repositories/producao/IProducaoRepository";
import { ProducaoInserirDTO } from "@/application/dtos/producao/Producao/ProducaoInserirDTO";
import { ProducaoStatus } from "@/domain/types/producaoStatus.enum";
import { ProducaoBuscarTodosDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosDTO";
import { ProducaoBuscarTodosResponseDTO } from "@/application/dtos/producao/Producao/ProducaoBuscarTodosResponse";

export class ProducaoService {
  constructor(private readonly producaoRepository: IProducaoRepository) {}

  async buscarTodos(dto:ProducaoBuscarTodosDTO): Promise<ProducaoBuscarTodosResponseDTO> {
    return this.producaoRepository.buscarTodos(dto);
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
